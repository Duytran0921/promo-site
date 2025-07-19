'use client';
import React, { useEffect, useRef } from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceString,
  useViewModelInstanceNumber,
  useViewModelInstanceBoolean,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
} from '@rive-app/react-webgl2';

const SaasPackageRive = ({ className = '', width = '100%', height = 'auto' }) => {
  // Bước 1: Load Rive animation với useRive hook
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/SaasPackage.riv', // File .riv
    autoplay: true, // Tự play khi load
    stateMachines: ['State Machine 1'], // Kiểm tra tên chính xác trong Rive Editor
    autoBind: false, // Manual bind để kiểm soát
    onLoad: () => console.log('Rive loaded'), // Debug load
  });

  // Bước 2: Lấy ViewModels để inspect cấu trúc
  const vmPPackage = useViewModel(rive, { name: 'ProductPackage' });
  console.log('ProductPackage Properties:', vmPPackage?.properties);

  const vmCardModel = useViewModel(rive, { name: 'productCard' });
  console.log('productCard Properties:', vmCardModel?.properties);

  const vmProduct = useViewModel(rive, { name: 'Product' });
  console.log('Product Properties:', vmProduct?.properties);

  const vmButton = useViewModel(rive, { name: 'Button' });
  console.log('Button Properties:', vmButton?.properties);

  // Bước 3: Tạo top-level instance
  const vmPPackageInstance = useViewModelInstance(vmPPackage, { rive });

  // Bước 4: Property hooks at top-level để set values
  const { setValue: setCard1Header } = useViewModelInstanceString('ProductCard_1/Header', vmPPackageInstance);
  const { setValue: setCard1Main } = useViewModelInstanceString('ProductCard_1/Main', vmPPackageInstance);
  const { setValue: setCard1ButtonLabel } = useViewModelInstanceString('ProductCard_1/property of Button/Label', vmPPackageInstance);
  const { setValue: setCard1ButtonColorMain } = useViewModelInstanceColor('ProductCard_1/property of Button/colorMain', vmPPackageInstance);
  const { setValue: setCard1ProductState } = useViewModelInstanceString('ProductCard_1/property of Product/State', vmPPackageInstance);
  const { setValue: setCard1ProductOpen } = useViewModelInstanceBoolean('ProductCard_1/property of Product/open', vmPPackageInstance);

  const { setValue: setCard2Header } = useViewModelInstanceString('ProductCard_2/Header', vmPPackageInstance);
  const { setValue: setCard2Main } = useViewModelInstanceString('ProductCard_2/Main', vmPPackageInstance);
  const { setValue: setCard2ButtonLabel } = useViewModelInstanceString('ProductCard_2/property of Button/Label', vmPPackageInstance);
  const { setValue: setCard2ButtonColorMain } = useViewModelInstanceColor('ProductCard_2/property of Button/colorMain', vmPPackageInstance);
  const { setValue: setCard2ProductState } = useViewModelInstanceString('ProductCard_2/property of Product/State', vmPPackageInstance);
  const { setValue: setCard2ProductOpen } = useViewModelInstanceBoolean('ProductCard_2/property of Product/open', vmPPackageInstance);

  // Bước 5: Trigger hooks with onTrigger để cuộn trang
  useViewModelInstanceTrigger('ProductCard_1/property of Button/btnTrigger', vmPPackageInstance, {
    onTrigger: () => {
      console.log('Card1 Button Triggered! Scrolling to section-premium');
      const section = document.getElementById('saas-package'); // DOM element
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Cuộn mượt
      } else {
        console.warn('Section #section-premium not found, fallback to 500px');
        window.scrollTo({ top: 500, behavior: 'smooth' }); // Fallback tọa độ
      }
    },
  });

  useViewModelInstanceTrigger('ProductCard_2/property of Button/btnTrigger', vmPPackageInstance, {
    onTrigger: () => {
      console.log('Card2 Button Triggered! Scrolling to section-basic');
      const section = document.getElementById('custom-pricing');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Section #section-basic not found, fallback to 1000px');
        window.scrollTo({ top: 1000, behavior: 'smooth' });
      }
    },
  });

  // Ref cho animation loop
  const animationFrameId = useRef(null);

  // Bước 6: Logic bind, set trong useEffect
  useEffect(() => {
    if (!rive || !vmPPackage || !vmPPackageInstance) return;

    // Debug state machines/artboard
    console.log('Rive State Machines:', rive.stateMachines);
    console.log('Rive Default Artboard:', rive.defaultArtboard);

    // Lấy stateMachine/artboard
    let stateMachine = null;
    if (rive.stateMachines && rive.stateMachines.length > 0) {
      stateMachine = rive.stateMachines[0];
    } else {
      console.warn('No state machines - fallback to artboard');
    }
    const artboard = rive.defaultArtboard;

    // Bind instance trước set
    if (stateMachine) stateMachine.bindViewModelInstance(vmPPackageInstance);
    else if (artboard) artboard.bindViewModelInstance(vmPPackageInstance);

    // Set values sau bind
    if (setCard1Header) setCard1Header('SAAS PACKAGE');
    if (setCard1Main) setCard1Main('Gói giải pháp đóng gói SaaS cho phép doanh nghiệp tích hợp nền tảng gamified dưới thương hiệu riêng của mình.');
    if (setCard1ButtonLabel) setCard1ButtonLabel('Xem Thêm');
    if (setCard1ButtonColorMain) setCard1ButtonColorMain(0xFF0000FF);
    if (setCard1ProductState) setCard1ProductState('Active');
    if (setCard1ProductOpen) setCard1ProductOpen(true);

    if (setCard2Header) setCard2Header('CUSTOMIZE PACKAGE');
    if (setCard2Main) setCard2Main('Gói Customize từ PromoGame là giải pháp linh hoạt dành cho doanh nghiệp có yêu cầu đặc biệt về Gameplay, hành trình người dùng, giao diện hoặc tích hợp hệ thống.');
    if (setCard2ButtonLabel) setCard2ButtonLabel('Xem Thêm');
    if (setCard2ButtonColorMain) setCard2ButtonColorMain(0xFFFF0000);
    if (setCard2ProductState) setCard2ProductState('Inactive');
    if (setCard2ProductOpen) setCard2ProductOpen(true);

    // Advance initial
    if (artboard) artboard.advance(0);
    if (stateMachine) stateMachine.advance(0);

    // Loop advance để apply liên tục
    let lastTime = performance.now();
    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      if (artboard) artboard.advance(delta);
      if (stateMachine) stateMachine.advance(delta);
      lastTime = time;
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (stateMachine) stateMachine.unbindViewModelInstance(vmPPackageInstance);
      else if (artboard) artboard.unbindViewModelInstance(vmPPackageInstance);
    };
  }, [rive, vmPPackage, vmPPackageInstance, setCard1Header, setCard1Main, setCard1ButtonLabel, setCard1ButtonColorMain, setCard1ProductState, setCard1ProductOpen, setCard2Header, setCard2Main, setCard2ButtonLabel, setCard2ButtonColorMain, setCard2ProductState, setCard2ProductOpen]);

  // Render with style to ensure canvas size
  return (
    <div className={className} style={{ width, height, position: 'relative', aspectRatio: '1920/653', maxWidth: '100%', overflow: 'hidden' }}>
      <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default SaasPackageRive;