import { getUsers } from "@/data/mediaCards"

export default async function Test() {
  const data = await getUsers(10000)

  return (
    <div>Test</div>
  )
}
