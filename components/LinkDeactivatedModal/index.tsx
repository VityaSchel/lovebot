import styles from './styles.module.scss'
import cx from 'classnames'
import Image from 'next/image'
import warn from './warn.svg'

interface LinkDeactivatedModalProps {
  view: boolean
}

export default function LinkDeactivatedModal(props: LinkDeactivatedModalProps) {

  return(
    <div className={cx({
      [styles.viewModalWrapper]: props.view,
      [styles.hideModalWrapper]: !props.view
    })}>
      <div className={styles.modal}>
        <Image 
          src={warn}
          width={54}
          height={54}
          alt='Внимание!'
        />
        <h1>Данная ссылка деактивирована</h1>
        <h2>Пожалуйста создайте другую ссылку</h2>
      </div>
    </div>
  )
}
