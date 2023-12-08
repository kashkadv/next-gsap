
import { Suspense } from "react"
import UserCards from "@/components/UserCards"
import Loading from "@/components/UI/Loading"

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <UserCards />
    </Suspense>
  )
}
