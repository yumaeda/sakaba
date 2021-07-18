const MenuDictionary : { [id: number]: { text: string, [id: number]: { text: string, [id: number]: string } } } = {
    1: {
        text: 'COCKTAIL',
        1: { text: 'GIN BASE', 0: '' },
        2: { text: 'VODKA BASE', 0: '' },
        3: { text: 'RUM BASE', 0: '' },
        4: { text: 'TEQUILA BASE', 0: '' },
        5: { text: 'BRANDY BASE', 0: '' },
        6: { text: 'WHISKEY BASE', 0: '' },
        7: { text: 'WINE BASE', 0: '' },
        8: { text: 'LIQUEUR BASE', 0: '' }
    },
    2: {
        text: 'WHISKY',
        1: {
            text: 'SCOTCH',
            1: 'Speyside-ｽﾍﾟｲｻｲﾄﾞ',
            2: 'Highland-ﾊｲﾗﾝﾄﾞ',
            3: 'Lowland-ﾛ−ﾗﾝﾄﾞ',
            4: 'Islands-ｱｲﾗﾝｽﾞ',
            5: 'Islay-ｱｲﾗ',
            6: 'Campbeltown-ｷｬﾝﾍﾞﾙﾀｳﾝ',
            7: 'Blended-ﾌﾞﾚﾝﾃﾞｯﾄﾞ'
        },
        2: { text: 'JAPANESE', 0: '' },
        3: { text: 'BOURBON', 0: '' },
        4: { text: 'TENNESSEE, CORN, RYE', 0: '' },
        5: { text: 'CANADIAN, IRISH', 0: '' },
        6: { text: 'OLD BOTTLE', 0: '' },
        7: {
            text: 'SCOTCH BOTTLER\'S BRAND',
            1: 'Whisk-e Oceans Series-ｵｰｼｬﾝｽﾞｼﾘｰｽﾞ',
            2: 'Whisky Mew-ｳｲｽｷｰﾐｭｳ',
            3: 'Maltoyama-ﾓﾙﾄﾔﾏ',
            4: 'Hunter Laing-ﾊﾝﾀｰﾚｲﾝ',
            5: 'Ian Macleod-ｲｱﾝ・ﾏｸﾛｰﾄﾞ',
        }
    },
    3: {
        text: 'BRANDY',
        0: { text: '', 0: '' }
    },
    4: {
        text: 'ORIGINAL',
        0: { text: '', 0: '' }
    },
    5: {
        text: 'BEER',
        0: { text: '', 0: '' }
    },
    6: {
        text: 'SPIRITS',
        1: { text: 'GIN', 0: '' },
        2: { text: 'VODKA', 0: '' },
        3: { text: 'RUM', 0: '' },
        4: { text: 'TEQUILA', 0: '' }
    }
}

export default MenuDictionary
