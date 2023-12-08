import Test from "@/components/Test"
import Loading from "@/components/UI/Loading"
import { Suspense } from "react"


export default async function Page() {  
  return (
    <Suspense fallback={<Loading />}>
      <Test />
    </Suspense>
  )
}
