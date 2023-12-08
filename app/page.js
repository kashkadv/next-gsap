'use client'

import Script from "next/script"
import { Suspense, useEffect, useState } from "react"
import ScrollMagic from "@/components/ScrollMagic"

export default function Home() {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, 1000)

  return (
    <main>
      {loaded && <ScrollMagic />}
    </main>
  )
}
