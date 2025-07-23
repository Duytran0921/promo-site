'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceString,
  useViewModelInstanceNumber,
  useViewModelInstanceBoolean,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
  Layout,
  Fit,
  Alignment
} from '@rive-app/react-webgl2';

function normalizePath(path) {
  if (!path) return '/';
  // Bỏ dấu / cuối (trừ trường hợp chỉ là '/')
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Bước 1: Load Rive animation với useRive hook
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/navbarN.riv', // File .riv
    autoplay: true, // Tự play khi load
    stateMachines: ['State Machine 1'], // Kiểm tra tên chính xác trong Rive Editor
    layout : new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoBind: false, // Manual bind để kiểm soát
    onLoad: () => console.log('Rive loaded'), // Debug load
  });

  // Bước 2: Lấy ViewModels để inspect cấu trúc
  const vmPNavBar = useViewModel(rive, { name: 'NavBar' });
  // console.log('NavBar Properties:', vmPPackage?.properties);

  const vm = useViewModel(rive, { name: 'Item' });
//   console.log('productCard Properties:', vmCardModel?.properties);

//   const vmProduct = useViewModel(rive, { name: 'Product' });
//   console.log('Product Properties:', vmProduct?.properties);

//   const vmButton = useViewModel(rive, { name: 'Button' });
//   console.log('Button Properties:', vmButton?.properties);

  // Bước 3: Tạo top-level instance
  const vmNavBarInstance = useViewModelInstance(vmPNavBar, { rive });

  // Bước 4: Property hooks at top-level để set values
  const { setValue: setItem1Label } = useViewModelInstanceString('itemHome/Label', vmNavBarInstance);
  const { setValue: setItem2Label } = useViewModelInstanceString('itemGPP/Label', vmNavBarInstance);
  const { setValue: setItem3Label } = useViewModelInstanceString('itemServices/Label', vmNavBarInstance);
  const { setValue: setItem4Label } = useViewModelInstanceString('gameLab/Label', vmNavBarInstance);

//   const { setValue: setCard1ButtonColorMain } = useViewModelInstanceColor('ProductCard_1/property of Button/colorMain', vmPPackageInstance);
//   const { setValue: setCard1ProductState } = useViewModelInstanceString('ProductCard_1/property of Product/State', vmPPackageInstance);
  const { setValue: setItem1Active } = useViewModelInstanceBoolean('itemHome/active', vmNavBarInstance);
  const { setValue: setItem2Active } = useViewModelInstanceBoolean('itemGPP/active', vmNavBarInstance);
  const { setValue: setItem3Active } = useViewModelInstanceBoolean('itemServices/active', vmNavBarInstance);
  const { setValue: setItem4Active } = useViewModelInstanceBoolean('gameLab/active', vmNavBarInstance);


//   const { setValue: setCard2Header } = useViewModelInstanceString('ProductCard_2/Header', vmPPackageInstance);
//   const { setValue: setCard2Main } = useViewModelInstanceString('ProductCard_2/Main', vmPPackageInstance);
//   const { setValue: setCard2ButtonLabel } = useViewModelInstanceString('ProductCard_2/property of Button/Label', vmPPackageInstance);
//   const { setValue: setCard2ButtonColorMain } = useViewModelInstanceColor('ProductCard_2/property of Button/colorMain', vmPPackageInstance);
//   const { setValue: setCard2ProductState } = useViewModelInstanceString('ProductCard_2/property of Product/State', vmPPackageInstance);
//   const { setValue: setCard2ProductOpen } = useViewModelInstanceBoolean('ProductCard_2/property of Product/open', vmPPackageInstance);

  // Bước 5: Trigger hooks with onTrigger để cuộn trang (KHÔNG set active ở đây nữa)
  useViewModelInstanceTrigger('itemHome/itemTrigger', vmNavBarInstance, {
    onTrigger: () => {
      router.push('/');
    },
  });

  useViewModelInstanceTrigger('itemGPP/itemTrigger', vmNavBarInstance, {
    onTrigger: () => {
      router.push('/GamificationPlatform/');
    },
  });

  useViewModelInstanceTrigger('itemServices/itemTrigger', vmNavBarInstance, {
    onTrigger: () => {
      router.push('/Services/');
    },
  });

  useViewModelInstanceTrigger('gameLab/itemTrigger', vmNavBarInstance, {
    onTrigger: () => {
      router.push('/test-match2');
    },
  });

//   useViewModelInstanceTrigger('ProductCard_2/property of Button/btnTrigger', vmPPackageInstance, {
//     onTrigger: () => {
//       console.log('Card2 Button Triggered! Scrolling to section-basic');
//       const section = document.getElementById('custom-pricing');
//       if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         console.warn('Section #section-basic not found, fallback to 1000px');
//         window.scrollTo({ top: 1000, behavior: 'smooth' });
//       }
//     },
//   });

//   // Ref cho animation loop
//   const animationFrameId = useRef(null);

  // Bước 6: Logic bind, set trong useEffect
  useEffect(() => {
    if (!rive || !vmNavBarInstance) return;

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
    if (stateMachine) stateMachine.bindViewModelInstance(vmNavBarInstance);
    else if (artboard) artboard.bindViewModelInstance(vmNavBarInstance);

    // Set values sau bind
    if (setItem1Label) setItem1Label('Home');
    if (setItem2Label) setItem2Label('GP Platform');
    if (setItem3Label) setItem3Label('Services');
    if (setItem4Label) setItem4Label('Game Lab');

//     if (setCard1Main) setCard1Main('Gói giải pháp đóng gói SaaS cho phép doanh nghiệp tích hợp nền tảng gamified dưới thương hiệu riêng của mình.');
//     if (setCard1ButtonLabel) setCard1ButtonLabel('Xem Thêm');
//     if (setCard1ButtonColorMain) setCard1ButtonColorMain(0xFF0000FF);
//     if (setCard1ProductState) setCard1ProductState('Active');
//     if (setCard1ProductOpen) setCard1ProductOpen(true);

//     if (setCard2Header) setCard2Header('CUSTOMIZE PACKAGE');
//     if (setCard2Main) setCard2Main('Gói Customize từ PromoGame là giải pháp linh hoạt dành cho doanh nghiệp có yêu cầu đặc biệt về Gameplay, hành trình người dùng, giao diện hoặc tích hợp hệ thống.');
//     if (setCard2ButtonLabel) setCard2ButtonLabel('Xem Thêm');
//     if (setCard2ButtonColorMain) setCard2ButtonColorMain(0xFFFF0000);
//     if (setCard2ProductState) setCard2ProductState('Inactive');
//     if (setCard2ProductOpen) setCard2ProductOpen(true);

//     // Advance initial
//     if (artboard) artboard.advance(0);
//     if (stateMachine) stateMachine.advance(0);

//     // Loop advance để apply liên tục
//     let lastTime = performance.now();
//     const animate = (time) => {
//       const delta = (time - lastTime) / 1000;
//       if (artboard) artboard.advance(delta);
//       if (stateMachine) stateMachine.advance(delta);
//       lastTime = time;
//       animationFrameId.current = requestAnimationFrame(animate);
//     };
//     animationFrameId.current = requestAnimationFrame(animate);

//     // Cleanup
    return () => {
      // if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (stateMachine) stateMachine.unbindViewModelInstance(vmNavBarInstance);
      else if (artboard) artboard.unbindViewModelInstance(vmNavBarInstance);
    };
  }, [rive, vmPNavBar, vmNavBarInstance, setItem1Label]);

  // Set active property của Rive dựa vào pathname
  useEffect(() => {
    if (!vmNavBarInstance) return;
    // Reset tất cả về false trước
    if (setItem1Active) setItem1Active(false);
    if (setItem2Active) setItem2Active(false);
    if (setItem3Active) setItem3Active(false);
    if (setItem4Active) setItem4Active(false);

    const currentPath = normalizePath(pathname);

    if (currentPath === '/') {
      if (setItem1Active) setItem1Active(true);
    } else if (currentPath === '/GamificationPlatform') {
      if (setItem2Active) setItem2Active(true);
    } else if (currentPath === '/Services') {
      if (setItem3Active) setItem3Active(true);
    } else if (currentPath === '/test-match2') {
      if (setItem4Active) setItem4Active(true);
    }
  }, [pathname, vmNavBarInstance, setItem1Active, setItem2Active, setItem3Active, setItem4Active]);

  // Render with style to ensure canvas size
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full h-20">
        <RiveComponent 
          style={{ width: '100%', height: '100%', display: 'block' }} 
        />
      </div>
    </div>
  );
};

export default NavBar;