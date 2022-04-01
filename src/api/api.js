export async function getProducts(skip = 0) {
    const response = await fetch('http://testtask.alto.codes/front-products.php?skip=' + skip, {
        mode: 'no-cors',
    })
    if (response.status < 200 || response.status >= 300) {
        throw new Error('wrong request status')
    }
    return await response.json()
}

