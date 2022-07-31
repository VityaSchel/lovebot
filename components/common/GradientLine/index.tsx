import styles from './styles.module.scss'

export default function GradientLine(props: { height: number | string }) {
  return (
    <div className={styles.line} style={{ height: props.height ?? null }} />
  )
}