import { UserDetailScreen } from 'app/features/user/detail-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <div className="w-full flex">
          <title>User Detail</title>
          <meta name="description" content="User Detail" />
        </div>
      </Head>
      <UserDetailScreen />
    </>
  )
}
