const handleExport = useCallback(async (type: 'png' | 'jpeg') => {
    if (!componentRef.current) return;

    const options = {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1,
        backgroundColor: '#e8e8e8',
        filter: (node: HTMLElement) => {
            if (node.tagName === 'IMG') {
                const imgNode = node as HTMLImageElement;
                const originalSrc = imgNode.getAttribute('data-original-src') || imgNode.src;
                if (loadedImages[originalSrc]) {
                    imgNode.src = loadedImages[originalSrc];
                }
            }
            return true;
        }
    };

    try {
        const dataUrl = await (type === 'png' ? toPng(componentRef.current, options) : toJpeg(componentRef.current, options));
        const link = document.createElement('a');
        link.download = `github-bento.${type}`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error(`Error exporting as ${type}:`, err);
    }
}, [componentRef, loadedImages]);
