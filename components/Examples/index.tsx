import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Fade from 'react-reveal'

import Heading from '%/components/common/Heading'

import { ReactComponent as Play } from '../../public/static/play.svg'
import { ReactComponent as Pause } from '../../public/static/pause.svg'

import prank1 from '../../public/static/1.mp3'
import prank2 from '../../public/static/2.mp3'
import prank3 from '../../public/static/3.mp3'
import prank4 from '../../public/static/4.mp3'
import prank5 from '../../public/static/5.mp3'
import prank6 from '../../public/static/6.mp3'

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
      url: prank1,
      play: useAudio(prank1)
    },
    {
      id: 2,
      title: 'Батя рвал и метал от такого',
      url: prank2,
      play: useAudio(prank2)
    },
    {
      id: 3,
      title: 'Брат не ожидал подарочка',
      url: prank3,
      play: useAudio(prank3)
    },
    {
      id: 4,
      title: 'Разыграли учителя во время урока',
      url: prank4,
      play: useAudio(prank4)
    },
    {
      id: 5,
      title: 'Бомбануло у службы поддержки',
      url: prank5,
      play: useAudio(prank5)
    },
    {
      id: 6,
      title: 'Разыграли соседа типа полиция',
      url: prank6,
      play: useAudio(prank6)
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
