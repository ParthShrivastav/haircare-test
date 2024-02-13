import { H1, H2, H3, Paragraph, YStack } from '@my/ui'

export function HairTestHeader() {
  return (
    <YStack bg="$gray8Dark" px="$4" py="$2" $gtSm={{ px: '$10' }}>
      <H2 color="white">Traya.</H2>
      <Paragraph color={'white'}>This hair test is co-created with doctors</Paragraph>
    </YStack>
  )
}
