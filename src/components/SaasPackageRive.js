'use client';
import React from 'react';
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceString } from '@rive-app/react-webgl2';

const SaasPackageRive = ({ className = '', width = '100%', height = 'auto' }) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/SaasPackage.riv',
    autoplay: true,
    stateMachines: ['State Machine 1'],
  });
  // Get the default instance of the view model
  const productModel = useViewModel(rive, { name: 'Product' });

  const productPackageModel = useViewModel(rive, { name: 'ProductPackage' });
  const productCardModel = useViewModel(rive, { name: 'productCard' });

  const productInstance = useViewModelInstance(productModel, { rive });

  const productPackageInstance = useViewModelInstance(productPackageModel, { rive });

  // const productCardInstance = useViewModelInstance(productCardModel, { rive });

  // const { setValue: setProductCardHeader } = useViewModelInstanceString(
  //   'productCard/Header',
  //   productCardInstance
  // );

  // React.useEffect(() => {
  //   if (setProductCardHeader) {
  //     setProductCardHeader('Product Package');
  //   }
  // }, [setProductCardHeader]);

  return (
    <div
      className={className}
      style={{
        width: width,
        height: height,
        position: 'relative',
        aspectRatio: '1920/653', // giữ tỉ lệ gốc, có thể chỉnh lại nếu cần
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default SaasPackageRive;