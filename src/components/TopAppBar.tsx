"use client"

import { InvidiousAPI } from "../lib/Invidious"
import { DependencyList, lazy, useEffect, useRef, useState } from "react"
import PillButton from "./PillButtons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { logout } from "../store/user"

const SearchSuggestionEntry = lazy(() => import("./SearchSuggestionEntry"))

const useDebounce = (callback: () => void, timeout: number, depArray?: DependencyList) => {
  useEffect(() => {
    const debounceInterval = setTimeout(() => callback(), timeout)
    return () => clearTimeout(debounceInterval)
  }, depArray)
}

const onEscape = function (action: () => void) {
  const handler = (e: KeyboardEvent) => { if (e.key === "Escape") action() }
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler)
};


export default function TopAppBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [focused, setFocused] = useState(false)
  const [isMouseInside, setIsMouseInside] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const thisElementRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state: RootState) => state.user.value)
  const dispatch = useDispatch()

  const getSuggestions = async () => {
    if (searchQuery === "") return setSearchSuggestions([])
    const suggestions = await InvidiousAPI.getSearchSuggestions(searchQuery)
    setSearchSuggestions(suggestions.suggestions)
  }

  const navigateToResults = () => {
    if (searchQuery === '') return;
    navigate(`/results?search_query=${searchQuery}`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("shadow-2xl", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(thisElementRef.current!);

    const escapeCleanup = onEscape(() => {
      inputRef.current?.blur()
      setIsMouseInside(false)
    })

    return () => {
      escapeCleanup()
      observer.disconnect()
    }
  }, [])


  useDebounce(getSuggestions, 500, [searchQuery])

  return (
    <div ref={thisElementRef} className="flex px-8 py-4 flex-wrap items-center sticky top-[-1px] z-[1] bg-white">
      <Link to="/" className="pr-8 text-xl sm:text-2xl">NoAdsTube</Link>
      <span className="flex grow max-w-2xl">
        <span className="grow relative">
          <input
            ref={inputRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                setFocused(false)
                navigateToResults()
              }
            }}
            className="h-full w-full border-2 border-solid rounded-full text-xl font-semibold px-4"
            onChange={(evt) => setSearchQuery(evt.target.value)}
            type="text"
          />

          {(focused || isMouseInside) && searchSuggestions.length !== 0 &&
            <div
              onMouseEnter={() => setIsMouseInside(true)}
              onMouseLeave={() => setIsMouseInside(false)}
              className="absolute top-full w-full bg-white border-2 border-solid shadow-2xl rounded-2xl p-2 z-[1]">
              {searchSuggestions.map(x => <SearchSuggestionEntry onClick={() => {
                if (inputRef.current != null) {
                  inputRef.current.value = x
                }
                setIsMouseInside(false)
              }} value={x} />)}
            </div>
          }

        </span>
        <PillButton onClick={navigateToResults} className="material-symbols-outlined">search</PillButton>
      </span>
      <span className="ml-auto">
        {!user && location.pathname != '/login' &&
          <PillButton onClick={() => navigate('/login')}>login</PillButton>
        }
        {user &&
          <>
            {user.fullName}
            <PillButton className="inline ml-2" onClick={() => dispatch(logout())}>logout</PillButton>
          </>
        }
      </span>
    </div >
  )
}