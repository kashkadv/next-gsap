'use client'

import styles from './index.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'

import { delay } from "@/helpers/functions"
import { data } from "@/data/mediaCards"

gsap.registerPlugin(ScrollTrigger)
let ctx = gsap.context(() => {})

export default function UserCards() {
  const [users, setUsers] = useState(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    const getData = async () => {
      await delay(100)
      const result = data

      setUsers(result)
      setRendered(true)
    }

    getData()
  }, [])

  useEffect(() => {
    if (!rendered) return

    gsap.set(".card", {y: 100})

    ScrollTrigger.batch(".card", {
      onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, ease: 'back', duration: 1, stagger: {each: 0.5}, overwrite: true}),
      start: "top 75%"
    })
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".card", {y: 0}))

  }, [rendered])

  if (users === null) return ('loading')

  return (
    <div className={styles.grid}>
      { users.length === 0 ? <Empty /> : users.map((user, i) => <Card key={user.id} user={user} index={i} />) }
    </div>
  )
}

function Empty() {
  return (
    <div>There is no users</div>
  )
}

function Card({user}) {

  const card = useRef()
  const avatar = useRef()
  const heading = useRef()
  const description = useRef()

  useEffect(() => {
    const animation = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: card.current,
          start: "top 75%"
        }
      })
  
      tl.fromTo(avatar.current, {rotation: 25}, { rotation: 0, opacity: 1, duration: 3, ease: "elastic", delay: 0 })
        .to(heading.current, { x: 0, opacity: 1, duration: 3, ease: "elastic", delay: -2.8 })
        .to(description.current, {x: 0, opacity: 1, duration: 3, ease: "elastic", delay: -2.9 })
  
      return tl
    }
  
    ctx.add(animation)
  }, [])

  return (
    <div ref={card} className={`${styles.card} card`}>
      <div ref={avatar} className={styles.avatar} style={{'--bgColor': `${user.bgColor}20`}}>
        <Image alt={`${user.firstName} ${user.lastName} Avatar`} src={user.avatar} fill />
      </div>
      <div ref={heading} className={styles.heading}>{user.firstName} {user.lastName}</div>
      <div ref={description} className={styles.description}>{user.description}</div>
    </div>
  )
}
