import styles from './styles.module.scss'
import { ReactComponent as DarkTheme } from './darkTheme.svg'
import { ReactComponent as LightTheme } from './lightTheme.svg'
import { selectTheme } from '%/store/reducers/theme'
import { useAppSelector } from '%/store/hooks'
import cx from 'classnames'

export default function ThemeSwitcher(props: { onSwitch: (event: any) => void }) {
  const theme = useAppSelector(selectTheme)

  return (
    <div 
      className={cx(styles.container, { [styles.darkTheme]: theme === 'dark' })}
      onPointerUp={props.onSwitch}
    >
      <div className={styles.backgroundBubble} />
      <div className={styles.icons}>
        <LightTheme />
        <DarkTheme />
      </div>
    </div>
  )
}