import { Anchor, Button, H1, H2, H3, Paragraph, XStack, YStack } from '@my/ui'
import { UserCircle, ShoppingCart, Menu, Smartphone } from '@tamagui/lucide-icons'
import { Linking } from 'react-native'
import { useLink } from 'solito/link'

export function HomeHeader() {
  const linkProps = useLink({
    href: '/hair-test',
  })

  const whatsappRedirection = () => {
    Linking.openURL(
      'https://api.whatsapp.com/send/?phone=918828006272&text=Hey%21+I+would+like+to+know+more+about+Traya&type=phone_number&app_absent=0'
    )
  }

  return (
    <XStack bg="$gray8Dark" px="$4" py="$2" jc="space-between" ai="center">
      <H2 f={2} $gtSm={{ f: 8 }} color="white">
        Traya.
      </H2>
      <XStack f={1} jc="space-between" ai={'center'}>
        <Button
          {...linkProps}
          hoverStyle={{ bg: 'white' }}
          bg="white"
          color={'black'}
          fontWeight={'bold'}
          display="none"
          $gtSm={{ display: 'flex' }}
          jc="center"
        >
          Take the hair test™
        </Button>

        <Smartphone mx="$2" color={'white'} onPress={whatsappRedirection} />
        <UserCircle mx="$2" color={'white'} />
        <ShoppingCart mx="$2" color={'white'} />
        <Menu mx="$2" color={'white'} />
      </XStack>
    </XStack>
  )
}
