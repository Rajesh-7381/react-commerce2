import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const images = [
  'https://pbs.twimg.com/profile_images/1615271089705463811/v-emhrqu_400x400.png',
  'https://pbs.twimg.com/profile_images/1699355246991118336/F2MPVTkA_400x400.jpg',
  'https://pbs.twimg.com/profile_images/770495597744943104/qu6tTGvg_400x400.jpg',
  'https://scontent.fhyd14-2.fna.fbcdn.net/v/t39.30808-6/417196317_796752179161192_151163002014781342_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KhCcDbGXdnsQ7kNvgF4NfDg&_nc_ht=scontent.fhyd14-2.fna&oh=00_AYDp1Zs6z2EFPUVYBBbmi0MlmKLt7Vr6LYSQOEtlpsN64Q&oe=66C6B947',
  'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg?size=690:388',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcWLR8Er4sfXLeNYirWWWjfNh8Y-FK1H_BQ&s',
  'https://scontent.fhyd14-2.fna.fbcdn.net/v/t39.30808-6/278969228_10162174913869453_4593418328412631981_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xRBMAgZYdvEQ7kNvgFeo1FT&_nc_ht=scontent.fhyd14-2.fna&oh=00_AYC-bXE5JX8EkZ1RStOqpxL3kCB9j1PyXPPJb9G9whstxQ&oe=66C6B4FF',
];

const ImageList = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {images.map((image, index) => (
        <img key={index} src={image} height={40} alt="" />
      ))}
    </div>
  );
};

const QRCodeGenerator = () => {
  const [text, setText] = useState(100);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Pay Using Any Upi</h1>
      <h5>Total Amount : {text}</h5>
      {/** 
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      */}
      <div style={{ marginTop: '20px' }}>
        <QRCode value={text} size={256} />
      </div>
      <br />
      <ImageList />
    </div>
  );
};

export default QRCodeGenerator;