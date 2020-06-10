/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

const MeguroPage: React.FC<{}> = () => {
    const basePath = 'https://tokyo-takeout.com'
    const imageDir = `${basePath}/images/meguro`

    return (
        <>
            <header className="header">
                <h1 className="header-label">目黒テイクアウト</h1>
                <a href={`${basePath}/`}>Back</a>
            </header>
            <div className="contents">
                <p>
                    ※ テイクアウトの情報は、頻繁に変わる事が予想されます。<br />
                    以下の情報に誤りがある場合には<a href="mailto:support@tokyo-takeout.com">support@tokyo-takeout.com</a>までお知らせください。
                </p>
                <ul className="shop-list">
                    <li className="shop-item">
                        <div className="shop-item-grid">
                            <a href={`${imageDir}/image-not-available.png`} target="_blank">
                                <picture>
                                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/image-not-available_thumbnail.webp`} />
                                    <img src={`${imageDir}/image-not-available_thumbnail.png`} className="shop-image" alt="ONE THE DINER （ワンザダイナー）" />
                                </picture>
                            </a>
                        </div>
                        <div className="shop-item-grid">
                            <h4>
                                <a href="https://order.takeme.com/app/shop/74f9ee6c-7cfa-46bd-80e6-25b5c4648a50" rel="nofollow noopener" target="_blank">ONE THE DINER （ワンザダイナー）</a><br />
                                <span className="shop-genre">ダイニングバー、ステーキ、ハンバーガー</span>
                            </h4>
                            <p>
                                <span>東京都品川区上大崎1-1-14 ト-カン白金キャステ-ル 1F</span><br />
                                <span>［月〜金］11：30〜23:00、［土日］11：30〜21:00</span><br />
                                <a href="tel:03-6455-7588">03-6455-7588</a>
                            </p>
                        </div>
                    </li>
                </ul>
            </div> 
            <footer className="footer">&copy; 2020 東京テイクアウト</footer>
        </>
    )
}

export default MeguroPage
