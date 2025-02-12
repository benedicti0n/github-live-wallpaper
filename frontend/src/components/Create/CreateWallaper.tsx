import React from 'react'
import { useParams } from 'react-router-dom';

const CreateWallaper = () => {
    const { platform } = useParams<{ platform: string }>();

    return (
        <div>CreateWallaper for {platform}</div>
    )
}

export default CreateWallaper