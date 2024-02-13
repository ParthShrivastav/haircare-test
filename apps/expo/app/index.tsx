import { HomeScreen } from 'app/features/home/screen'
import { HomeHeader } from 'app/features/home/header'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <HomeScreen />
    </>
  )
}
