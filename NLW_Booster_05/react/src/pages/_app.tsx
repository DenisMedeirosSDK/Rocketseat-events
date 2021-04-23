import { Header } from '../components/Header'
import { Player } from '../components/player'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from '../contexts/PlayerContents'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider >

      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
