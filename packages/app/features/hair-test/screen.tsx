import { Button, Card, Paragraph, XStack, YStack, Text, Progress, Input, Image } from '@my/ui'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { useLink } from 'solito/link'

export function HairTestScreen() {
  const link = useLink({
    href: '/',
  })
  const [progress, setProgress] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleInputChange = (text: any) => {
    setAnswers({ ...answers, [currentQuestion]: text })
  }

  return (
    <YStack f={1} p="$4" bg="white" $gtSm={{ px: 300 }}>
      <XStack jc="center">
        {['About\nYou', 'Hair\nHealth', 'Your\nLifestyle', 'Scalp\nAssessment'].map((a) => (
          <Card f={1} bg="$gray5Light" mx="$1.5" p="$2.5" jc="center">
            <Text color={'black'} numberOfLines={2}>
              {a}
            </Text>
          </Card>
        ))}
      </XStack>
      <Progress size={'$3'} value={progress} mt="$4">
        <Progress.Indicator animation="bouncy" />
      </Progress>

      <QuestionsView
        currentQuestion={currentQuestion}
        answers={answers}
        data={data[currentQuestion]}
        handleInputChange={handleInputChange}
        handleCheckboxChange={(text) => {
          console.log('🚀 ~ HairTestScreen ~ text:', text)
          // handle checkbox change
          // if value is already present, remove it else add it

          const currentAnswer = answers[currentQuestion] || []
          console.log('🚀 ~ HairTestScreen ~ currentAnswer:', currentAnswer)
          const newAnswer = currentAnswer.includes(text)
            ? currentAnswer.filter((a) => a !== text)
            : [...currentAnswer, text]
          handleInputChange(newAnswer)
        }}
      />

      {currentQuestion !== 0 && (
        <Button
          my="$3"
          onPress={() => {
            setCurrentQuestion(currentQuestion - 1)
            setProgress(data[currentQuestion].progress)
          }}
          bg="#B7D34040"
          color="black"
          hoverStyle={{
            bg: '#B7D34040',
          }}
        >
          Previous
        </Button>
      )}

      {currentQuestion === data.length - 1 || (
        <Button
          onPress={() => {
            setCurrentQuestion(currentQuestion + 1)
            setProgress(data[currentQuestion].progress)
          }}
          hoverStyle={{
            bg: '#B7D34040',
          }}
          bg="#B7D34040"
          color="black"
        >
          Next
        </Button>
      )}
    </YStack>
  )
}

const InputQuestion = ({ data, onChange, value }) => {
  return (
    <YStack f={1} mt="$5">
      <Text color={'black'}>{data.question}</Text>
      <Input
        mt="$3"
        value={value}
        onChangeText={onChange}
        keyboardType={data.keyboard}
        maxLength={data.maxLength}
        returnKeyType="done"
        bg="$gray4Light"
        color={'black'}
      />
    </YStack>
  )
}

const RadioQuestion = ({ data, value, onRadioChange }) => {
  return (
    <YStack f={1} mt="$5">
      <Text color={'black'}>{data.question}</Text>
      <XStack mt="$2">
        {data.options.map((a) => (
          <Card
            key={a}
            f={1}
            bg={value === a ? '#B7D340' : '$gray5Light'}
            p="$4"
            mx="$1"
            onPress={() => onRadioChange(a)}
          >
            <Text color={'black'}>{a}</Text>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}

const CheckboxQuestion = ({ data, value, onCheckBoxChange }) => {
  return (
    <YStack f={1} mt="$5">
      <Text color={'black'}>{data.question}</Text>
      <XStack mt="$2">
        {data.options.map((a) => (
          <Card
            key={a}
            f={1}
            bg={value.includes(a) ? '#B7D340' : '$gray5Light'}
            p="$4"
            mx="$1"
            onPress={() => onCheckBoxChange(a)}
          >
            <Text color={'black'}>{a}</Text>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}

const RadioImageQuestion = ({ data }) => {
  return (
    <YStack f={1} mt="$5">
      <Text color={'black'}>{data.question}</Text>
      <XStack mt="$2" fw={'wrap'}>
        {data.options.map((a) => (
          <XStack
            width={'40%'}
            $gtSm={{ width: '20%' }}
            key={a.text}
            jc="center"
            bg="$gray5Light"
            p="$4"
            m="$1"
          >
            <Text f={1} color={'black'}>
              {a.text}
            </Text>
            <Image source={{ uri: a.image }} height={50} width={50} />
          </XStack>
        ))}
      </XStack>
    </YStack>
  )
}

const ImageUploadQuestion = ({ data }) => {
  useEffect(() => {
    ImagePicker.getMediaLibraryPermissionsAsync()
  }, [])
  const [image, setImage] = useState(null)
  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setImage(result.assets[0].uri)
  }
  return (
    <YStack f={1} mt="$5">
      <Text color={'black'}>{data.question}</Text>
      <Card f={1} bg="white" p="$4" mt="$2" onPress={pickImage}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </Card>
    </YStack>
  )
}

const QuestionsView = ({
  currentQuestion,
  data,
  handleInputChange,
  handleCheckboxChange,
  answers,
}) => {
  switch (data.type) {
    case 'input':
      return (
        <InputQuestion value={answers[currentQuestion]} data={data} onChange={handleInputChange} />
      )
    case 'radio':
    case 'radio-text':
      return (
        <RadioQuestion
          data={data}
          value={answers[currentQuestion]}
          onRadioChange={handleInputChange}
        />
      )

    case 'checkbox':
      return (
        <CheckboxQuestion
          value={answers[currentQuestion] || []}
          data={data}
          onCheckBoxChange={handleCheckboxChange}
        />
      )
    case 'radio-image':
      return <RadioImageQuestion data={data} />
    case 'image-upload':
      return <ImageUploadQuestion data={data} />
    default:
      return <Text color={'black'}>Invalid Question</Text>
  }
}

const data = [
  {
    question: 'Before we start, can we get your name?',
    type: 'input',
    keyboard: 'default',
    section: 'About\nYou',
    progress: 6,
  },
  {
    question: 'Phone Number',
    type: 'input',
    keyboard: 'numeric',
    maxLength: 10,
    section: 'About\nYou',
    progress: 13,
  },
  {
    question: 'Email',
    type: 'input',
    keyboard: 'email-address',
    maxLength: 60,
    section: 'About\nYou',
    progress: 19,
  },
  {
    question: 'How old are you?',
    type: 'input',
    keyboard: 'numeric',
    maxLength: 3,
    section: 'About\nYou',
    progress: 25,
  },
  {
    question: 'Gender',
    type: 'radio',
    options: ['Male', 'Female'],
    section: 'About\nYou',
    progress: 31,
  },
  {
    question: 'Which image best describes your hair loss?',
    type: 'radio-image',
    options: [
      { text: 'Stage-1', image: 'https://traya.app/_next/static/media/stage1.ded3ad2d.svg' },
      { text: 'Stage-2', image: 'https://traya.app/_next/static/media/stage2.89ee6681.svg' },
      { text: 'Stage-3', image: 'https://traya.app/_next/static/media/stage3.5097da73.svg' },
      { text: 'Stage-4', image: 'https://traya.app/_next/static/media/stage4.ae5d18a6.svg' },
      { text: 'Stage-5', image: 'https://traya.app/_next/static/media/stage5.a165577f.svg' },
      { text: 'Stage-6', image: 'https://traya.app/_next/static/media/stage6.fded0280.svg' },
      {
        text: 'Coin Size Patch',
        image: 'https://traya.app/_next/static/media/coin-size.d0ab7872.svg',
      },
      {
        text: 'Heavy Hair Fall',
        image: 'https://traya.app/_next/static/media/hair-fall.ad0b2342.svg',
      },
    ],
    section: 'Hair\nHealth',
    progress: 38,
  },
  {
    question: 'Do you have a family history of hair loss?',
    type: 'radio-text',
    options: [
      "Mother or anyone from mother's side of the family",
      "Father or anyone from father's side of the family",
      'Both',
      'None',
    ],
    section: 'Hair\nHealth',
    progress: 44,
  },
  {
    question: 'Have you experienced any of the below in the last 1 year?',
    type: 'checkbox',
    options: [
      'None',
      'Severe Illness (Dengue, Malaria, Typhoid or Covid)',
      'Heavy weight loss / heavy weight gain',
      'Surgery / heavy medication',
    ],
    section: 'Hair\nHealth',
    progress: 50,
  },
  {
    question: 'Do you have dandruff?',
    type: 'radio-text',
    options: [
      'No',
      'Yes, mild that comes and goes',
      'Yes, heavy dandruff that sticks to the scalp',
      'I have Psoriasis',
      'I have Seborrheic Dermatitis',
    ],
    section: 'Hair\nHealth',
    progress: 56,
  },
  {
    question: 'How well do you sleep?',
    type: 'radio-text',
    options: [
      'Very peacefully for 6 to 8 hours',
      'Disturbed sleep, I wake up at least one time during the night',
      'Have difficulty falling asleep',
    ],
    section: 'Your\nLifestyle',
    progress: 63,
  },
  {
    question: 'How stressed are you?',
    type: 'radio-text',
    options: [
      'None',
      'Low',
      'Moderate(work, family etc )',
      'High (Loss of close one, separation, home, illness)',
    ],
    section: 'Your\nLifestyle',
    progress: 69,
  },
  {
    question: 'Do you feel constipated?',
    type: 'radio-text',
    options: [
      'No/Rarely',
      'Yes',
      'Unsatisfactory bowel movements',
      'Suffering from IBS (irritable bowel syndrome) /dysentery',
    ],
    section: 'Your\nLifestyle',
    progress: 75,
  },
  {
    question: 'How are your energy levels?',
    type: 'radio-text',
    options: [
      'Always high',
      'Low when I wake up, but gradually increases',
      'Very low in afternoon',
      'Low by evening/night',
      'Always low',
    ],
    section: 'Your\nLifestyle',
    progress: 81,
  },
  {
    question: 'Are you currently taking any supplements or vitamins for hair?',
    type: 'radio-text',
    options: ['Yes', 'No', 'Not Sure'],
    section: 'Your\nLifestyle',
    progress: 88,
  },
  {
    question: 'Do you have Blood Pressure problem?',
    type: 'radio-text',
    options: ['None', 'Yes, high BP issue', 'Yes, low BP issue'],
    section: 'Your\nLifestyle',
    progress: 94,
  },
  {
    question: 'Upload your scalp photo.',
    type: 'image-upload',
    progress: 100,
  },
]
