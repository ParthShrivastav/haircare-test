import { H3, H4, H5, H6, ScrollViewProps, useControllableState, useEvent } from '@my/ui'
import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
  Image,
  isWeb,
  ScrollView,
  useWindowDimensions,
  Text,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useEffect, useRef, useState } from 'react'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const { height, width } = useWindowDimensions()

  const linkProps = useLink({
    href: '/hair-test',
  })

  const [positionI, setPositionI] = useControllableState({
    strategy: 'most-recent-wins',
    prop: 0,
    defaultProp: 0,
  })
  const position = positions[positionI]
  useEffect(() => {
    onPress()
  }, [])

  const onPress = useEvent(() => {
    setPositionI((x) => {
      return (x + 1) % positions.length
    })
  })

  const scrollViewRef: any = useRef()
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollSpeed = 50 // Adjust scroll speed as needed
  const scrollDirection = 'left' // Change to 'right' for scrolling rightwards
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        let nextPosition = scrollPosition
        if (scrollDirection === 'left') {
          nextPosition -= 1
        } else {
          nextPosition += 1
        }
        scrollViewRef.current.scrollTo({ x: nextPosition, animated: false })
        setScrollPosition(nextPosition)
      }
    }, scrollSpeed)

    return () => clearInterval(scrollInterval)
  }, [scrollPosition])

  return (
    <ScrollView bg="white">
      <YStack f={1}>
        <Image
          source={{
            uri: bgImage,
          }}
          width={'100%'}
          height={height / 1.5}
          f={1}
        />

        <YStack
          pos="absolute"
          px="$4"
          pt="$4"
          $gtSm={{ p: '$15', height: height / 1.5 }}
          gap="$3"
          jc="space-around"
        >
          <Paragraph size={'$9'} ta={'center'} fontFamily={'$heading'}>
            Doctor Recommended Hair loss Treatment
          </Paragraph>
          <Paragraph fontSize={'$6'} ta="center" my="$4">
            Know The Root Cause Of Your Hair Loss
          </Paragraph>
          <Paragraph fontSize={'$6'} ta="center" fontFamily={'$body'}>
            93% saw results* in 5 months
          </Paragraph>
          <Button {...linkProps}>Take the hair test™</Button>
        </YStack>

        {/* animated horizontally scrolling text */}
        <ScrollView
          horizontal
          // ref={scrollViewRef}
          animation={'bouncy'}

          // animateOnly={'onLayout'}
          contentContainerStyle={{ padding: 20 }}
        >
          {/* <XStack px="$4" pb="$4" f={1} $gtSm={{ p: '$10' }} gap="$3" jc="space-around" w="100%"> */}
          {[
            "Brand's Promise",
            'How it works',
            'Why Traya',
            'Success Stories',
            "Brand's Promise",
            'How it works',
            'Why Traya',
            'Success Stories',
            "Brand's Promise",
            'How it works',
            'Why Traya',
            'Success Stories',
            "Brand's Promise",
            'How it works',
            'Why Traya',
            'Success Stories',
          ].map((text, ind) => (
            <H3 ta="center" color="black" f={1} mr="$5" key={ind}>
              {text}
            </H3>
          ))}
          {/* </XStack> */}
        </ScrollView>

        {/* <YStack space="$4" bc="$background">
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo /> */}
      </YStack>
    </ScrollView>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
const webBGImage =
  'https://traya.app/_next/image?url=https%3A%2F%2Fdvv8w2q8s3qot.cloudfront.net%2Fwebsite_images%2Fmale_landing_page%2FWebsite_banner.webp&w=3840&q=75'
const mobileBGImage =
  'https://traya.app/_next/image?url=https%3A%2F%2Fdvv8w2q8s3qot.cloudfront.net%2Fwebsite_images%2Fmale_landing_page%2Fmobile_image.webp&w=3840&q=75'

const bgImage = isWeb ? webBGImage : mobileBGImage

export const positions = [
  {
    x: 0,
    y: 0,
    scale: 1,
    rotate: '0deg',
  },
  {
    x: -50,
    y: -50,
    scale: 0.5,
    rotate: '-45deg',
    hoverStyle: {
      scale: 0.6,
    },
    pressStyle: {
      scale: 0.4,
    },
  },
  {
    x: 50,
    y: 50,
    scale: 1,
    rotate: '180deg',
    hoverStyle: {
      scale: 1.1,
    },
    pressStyle: {
      scale: 0.9,
    },
  },
]
