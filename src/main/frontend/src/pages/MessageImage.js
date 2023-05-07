import React from 'react';

function MessageImage( {imageData} ) {

    const blob = new Blob([imageData], {type:'image/jpeg'});
    const imageUrl = URL.createObjectURL(blob);

    return (
        <div>
            <img src={imageUrl} alt="이미지" />
        </div>
    );
}

export default MessageImage;