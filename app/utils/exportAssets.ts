export const handleExportToPng = useCallback(() => {
    console.log('1');

    if (componentRef.current === null) {
        return
    }

    toPng(componentRef.current, { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'my-image-name.png'
            link.href = dataUrl
            link.click()
            console.log('2');

        })
        .catch((err) => {
            console.log(err)
        })
}, [componentRef])