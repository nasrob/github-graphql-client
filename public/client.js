document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/data')
    const text = await response.json()
    console.log(data)
})