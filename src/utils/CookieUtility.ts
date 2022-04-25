const getCookie = (name: string): string => {
    const tokens = document.cookie.split(';')
    let value = ''
    for (var i = 0; i < tokens.length; ++i) {
        const token = tokens[i].split('=')
        if (name == token[0].trim()) {
            value = decodeURIComponent(token[1])
            break
        }
    }

    return value
}

export { getCookie }
