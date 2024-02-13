import { HairTestScreen } from 'app/features/hair-test/screen'
import { HairTestHeader } from 'app/features/hair-test/header'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <HairTestHeader />
      <HairTestScreen />
    </>
  )
}
