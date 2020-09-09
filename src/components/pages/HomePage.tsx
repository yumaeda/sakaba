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
                    東京でもようやく緊急事態宣言が解除されました。<br/>
                    営業を再開したお店も多いですが、新型コロナウイルスへの懸念からテイクアウトを続けるお店も多いようです。<br/>
                    消費者としては、<a href="https://demae-can.com/" rel="nofollow noopener">出前館</a>や<a href="https://about.ubereats.com/ja/" rel="nofollow noopener">Uber Eats</a>のような出前の方が手軽ですが、手数料や初期費用がかかるため導入を躊躇するお店は多いと思います。<br/><br/>
                    このサイトでは、そのようなお悩みを抱えていると思われる東京のお店を私の方で勝手に紹介していきます。<br/>
                </p>
                <ul className="town-list">
                    <Link className="list-item" to="/ikebukuro/">池袋</Link>
                    <Link className="list-item" to="/itabashi/">板橋</Link>
                    <Link className="list-item" to="/kagurazaka">神楽坂</Link>
                    <Link className="list-item" to="/kanda">神田</Link>
                    <Link className="list-item" to="/kyodo">経堂</Link>
                    <Link className="list-item" to="/shibuya">渋谷</Link>
                    <Link className="list-item" to="/meguro">目黒</Link>
                </ul>
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
