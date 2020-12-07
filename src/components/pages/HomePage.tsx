/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC<{}> = () => {
    return (
        <>
            <header>
                <h1 className="header-label">東京テイクアウト</h1>
                <img className="header-image" src="https://cdn.tokyo-hideaway.com/images/cover.jpg" alt="東京テイクアウト・カバー" />
            </header>
            <div className="contents">
                <p>
                    依然として、東京では新型コロナウイルスの影響で減った売上を少しでも補填しようとテイクアウトを続けるお店も多いようです。<br/>
                    消費者としては、<a href="https://demae-can.com/" rel="nofollow noopener">出前館</a>や<a href="https://about.ubereats.com/ja/" rel="nofollow noopener">Uber Eats</a>のような出前の方が手軽ですが、手数料や初期費用がかかるため導入を躊躇するお店は多いと思います。<br/><br/>
                    このサイトでは、そのようなお悩みを抱えていると思われる東京のお店を私の方で勝手に紹介していきます。<br/>
                    また、テイクアウトのありなしに関わらず、私のお世話になっている飲食店も併せて紹介する予定です。
                </p>
                <ul className="town-list">
                    <Link className="list-item" to="/ikebukuro/">池袋</Link>
                    <Link className="list-item" to="/itabashi/">板橋</Link>
                    <Link className="list-item" to="/itabashi-honcho/">板橋本町</Link>
                    <Link className="list-item" to="/otsuka/">大塚</Link>
                    <Link className="list-item" to="/oyama/">大山</Link>
                    <Link className="list-item" to="/kagurazaka">神楽坂</Link>
                    <Link className="list-item" to="/kasumigaseki">霞ヶ関</Link>
                    <Link className="list-item" to="/kanda">神田</Link>
                    <Link className="list-item" to="/kyodo">経堂</Link>
                    <Link className="list-item" to="/gokokuji">護国寺</Link>
                    <Link className="list-item" to="/shibuya">渋谷</Link>
                    <Link className="list-item" to="/nakaitabashi">中板橋</Link>
                    <Link className="list-item" to="/nishidai">西台</Link>
                    <Link className="list-item" to="/meguro">目黒</Link>
                </ul>
                <p>
                    また、個人的に美味しいと思った料理も紹介していきたいと思ってます。<br />
                    <Link className="list-item" to="/ranking">フードランキング</Link>
                </p>
                <p>
                    <strong>[免責について]</strong><br /><br />
                    本サイトを利用する事により被った、いかなる被害や損害についても当サイトの管理者は一切の責任を負いません。<br />
                </p>
            </div>
            <footer className="footer">&copy; 2020 東京テイクアウト</footer>
        </>
    )
}

export default HomePage
