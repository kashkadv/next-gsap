'use client'

import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollMagic() {
  const [pageRendered, setPageRendered] = useState(false)


  useEffect(() => {
    setPageRendered(true)
  }, [])


  const ref = useRef()
  const ref6 = useRef()
  const ref7 = useRef()

  const trigger7 = useRef()
  const section = useRef()
  const right = useRef()

  const section2 = useRef()
  const right2 = useRef()

  const textBlock = useRef()
  const textBlock2 = useRef()

  let ctx = gsap.context(() => {})

  
  useEffect(() => {
    if (!pageRendered) return

    // ScrollSmoother.create({
    //   smooth: 2,
    //   effects: true,
    //   normalizeScroll: true
    // });

    const firstSectionAnimation = () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `${section.current.offsetHeight - textBlock2.current.offsetHeight + 100} top`,
        pin: right.current,
        // markers: true,
        invalidateOnRefresh: true,
        onLeave: () => textBlock.current.classList.add('test'),
        onEnterBack: () => textBlock.current.classList.remove('test')
      })
    }
    ctx.add(firstSectionAnimation)

    const firstSectionInnerAnimation = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "bottom center",
          end: "bottom top",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
          toggleActions: "play none none reverse"
        }
      })

      // tl.to(right.current, { opacity: 0 })

      return tl
    }

    ctx.add(firstSectionInnerAnimation)

    let secondSectionAnimation = () => {
      ScrollTrigger.create({
        trigger: section2.current,
        start: "top top",
        end: "bottom bottom",
        pin: right2.current,
        // markers: true,
        invalidateOnRefresh: true,
      })
    }
    ctx.add(secondSectionAnimation)

    let secondSectionInnerAnimation = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2.current,
          start: `${window.innerHeight * 0.25} center`,
          end: "top top",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
          toggleActions: "play none none reverse"
        }
      })

      tl.to(right2.current, { opacity: 1 })

      return tl
    }
    ctx.add(secondSectionInnerAnimation)



  }, [pageRendered])

  return (
    <div className={styles.div}>
      <div ref={section} className={styles.section}>
        <div className={styles.left}>
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={0} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={1} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={2} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={3} />
        </div>
        <div className={styles.right} ref={right}>
          <div className={`${styles.square} ${styles.textBlock}`} ref={textBlock}>Ut veniam fugiat minim eiusmod consequat voluptate laborum est. Aliqua voluptate qui consequat nulla eu veniam consectetur proident nostrud laboris irure. Fugiat officia deserunt nulla proident et fugiat ut magna.</div>
        </div>
        <div></div>
      </div>

      <div ref={section2} className={styles.section}>
        <div className={styles.left}>
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={0} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={1} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={2} />
          <MediaCard ctx={ctx} pageRendered={pageRendered} i={3} />
        </div>
        <div style={{ opacity: 0 }} className={styles.right} ref={right2}>
          <div className={`${styles.square} ${styles.textBlock}`} ref={textBlock2}>Pariatur ex nisi sint irure aliquip incididunt Lorem anim ad adipisicing. Exercitation laborum eu fugiat anim incididunt ad nostrud. Magna ad qui reprehenderit cupidatat ullamco nisi sunt laboris mollit in excepteur mollit aliqua ipsum. Pariatur anim ullamco cupidatat pariatur ea officia cillum.</div>
        </div>
        <div></div>
      </div>
    </div>
  )
}


function MediaCard({ pageRendered, ctx, i }) {
  console.log()
  
  const ref = useRef()
  
  useEffect(() => {

    const ft = () => {
      gsap.fromTo(ref.current, { rotation: 0 }, { 
        rotation: `${i % 2 && '-'}10`, 
        duration: 3, 
        scrollTrigger: { 
          trigger: ref.current, 
          start: "center bottom",
          // markers: true,
          end: "top top",
          scrub: true,
          toggleActions: "play none none reverse"
        } 
      })
    }

    ctx.add(ft)

  }, [pageRendered])

  return (
    <div className={styles.card} ref={ref}>
      <Image fill alt='1' src='https://images.unsplash.com/photo-1542642839-83adadcbe645?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
    </div>
  )
}