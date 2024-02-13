import { HairTestScreen } from 'app/features/hair-test/screen'
import { HairTestHeader } from 'app/features/hair-test/header'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <HairTestHeader />,
          headerShown: true,
        }}
      />
      <HairTestScreen />
    </>
  )
}
