import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Fade from 'react-reveal'

import Heading from '%/components/common/Heading'

import { ReactComponent as Play } from '../../public/static/play.svg'
import { ReactComponent as Pause } from '../../public/static/pause.svg'

import lovebot1 from '../../public/static/1.mp3'
import lovebot2 from '../../public/static/2.mp3'
import lovebot3 from '../../public/static/3.mp3'
import lovebot4 from '../../public/static/4.mp3'
import lovebot5 from '../../public/static/5.mp3'
import lovebot6 from '../../public/static/6.mp3'

import styles from './styles.module.scss'

export default function Examples() {
  const { t } = useTranslation('homePage')

  const useAudio = (url: string): Array<any> => {
    if (typeof Audio == 'undefined') {
      return []
    }

    const audio = useMemo(() => new Audio(url), [])
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
      playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false))
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false))
      }
    }, [])

    return [playing, toggle]
  }

  const examples = [
    {
      id: 1,
      title: 'Розыгрыш над другом с раннего утра',
      url: lovebot1,
      play: useAudio(lovebot1)
    },
    {
      id: 2,
      title: 'Батя рвал и метал от такого',
      url: lovebot2,
      play: useAudio(lovebot2)
    },
    {
      id: 3,
      title: 'Брат не ожидал подарочка',
      url: lovebot3,
      play: useAudio(lovebot3)
    },
    {
      id: 4,
      title: 'Разыграли учителя во время урока',
      url: lovebot4,
      play: useAudio(lovebot4)
    },
    {
      id: 5,
      title: 'Бомбануло у службы поддержки',
      url: lovebot5,
      play: useAudio(lovebot5)
    },
    {
      id: 6,
      title: 'Разыграли соседа типа полиция',
      url: lovebot6,
      play: useAudio(lovebot6)
    }
  ]

  const [currentAudio, setCurrentAudio] = useState<any>(0)
  const clickAudio = (audio: any) => {
    if (currentAudio || currentAudio !== audio.id) {
      const lastAudio = examples.find(ex => ex.id === currentAudio)

      if (lastAudio) {
        const [lastPlaying, lastToggle] = lastAudio.play
        lastPlaying && lastToggle()
      }
    }

    const [playing, toggle] = audio.play
    !playing && toggle()

    setCurrentAudio(audio.id)
  }

  return (
    <Fade bottom cascade>
      <div className={styles.container}>
        <Heading variant='h4' center>{t('examples.examples')}</Heading>
        <span className={styles.description}>{t('examples.tryExamples')}</span>
        <div className={styles.examples}>
          {
            examples.map((example) => (
              <div className={styles.example} key={example.id}>
                <div
                  className={styles.play}
                  onClick={() => clickAudio(example)}
                >
                  {example.play[0] ? <Pause /> : <Play />}
                </div>
                <div>
                  <span className={styles.title}>{t('examples.example')} {example.id}: </span>
                  <span>{example.title}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Fade>
  )
}
