/**
 * 애니메이션 제어 유틸리티 함수
 */

/**
 * 요소에 애니메이션 클래스를 추가하고 제거
 * @param {HTMLElement} element - 애니메이션을 적용할 요소
 * @param {string} animationClass - 애니메이션 클래스 이름
 * @param {number} duration - 애니메이션 지속 시간 (ms)
 * @returns {Promise} 애니메이션이 완료되면 resolve되는 Promise
 */
export const animateElement = (element, animationClass, duration = 500) => {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    element.classList.add(animationClass);
    
    const handleAnimationEnd = () => {
      element.classList.remove(animationClass);
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };

    element.addEventListener('animationend', handleAnimationEnd, { once: true });
    
    // 폴백: duration 후에도 애니메이션이 끝나지 않으면 강제로 제거
    setTimeout(() => {
      element.classList.remove(animationClass);
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    }, duration);
  });
};

/**
 * 페이드 인 애니메이션
 */
export const fadeIn = (element, duration = 500) => {
  return animateElement(element, 'animate-fade-in', duration);
};

/**
 * 페이드 아웃 애니메이션
 */
export const fadeOut = (element, duration = 500) => {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.opacity = '';
      element.style.transition = '';
      resolve();
    }, duration);
  });
};

/**
 * 슬라이드 인 애니메이션 (오른쪽에서)
 */
export const slideInFromRight = (element, duration = 500) => {
  return animateElement(element, 'animate-slide-in-right', duration);
};

/**
 * 슬라이드 인 애니메이션 (왼쪽에서)
 */
export const slideInFromLeft = (element, duration = 500) => {
  return animateElement(element, 'animate-slide-in-left', duration);
};

/**
 * 스케일 인 애니메이션
 */
export const scaleIn = (element, duration = 300) => {
  return animateElement(element, 'animate-scale-in', duration);
};

/**
 * 펄스 애니메이션 시작
 */
export const startPulse = (element) => {
  if (!element) return;
  element.classList.add('animate-pulse');
};

/**
 * 펄스 애니메이션 중지
 */
export const stopPulse = (element) => {
  if (!element) return;
  element.classList.remove('animate-pulse');
};

/**
 * 글로우 애니메이션 시작
 */
export const startGlow = (element) => {
  if (!element) return;
  element.classList.add('animate-glow');
};

/**
 * 글로우 애니메이션 중지
 */
export const stopGlow = (element) => {
  if (!element) return;
  element.classList.remove('animate-glow');
};

/**
 * 셰이크 애니메이션
 */
export const shake = (element, duration = 500) => {
  return animateElement(element, 'animate-shake', duration);
};

/**
 * 애니메이션 일시정지
 */
export const pauseAnimation = (element) => {
  if (!element) return;
  element.classList.add('animation-paused');
};

/**
 * 애니메이션 재개
 */
export const resumeAnimation = (element) => {
  if (!element) return;
  element.classList.remove('animation-paused');
  element.classList.add('animation-running');
};

/**
 * 스크롤 애니메이션 (요소가 뷰포트에 들어올 때 애니메이션)
 */
export const initScrollAnimation = (selector, animationClass = 'animate-fade-in', threshold = 0.1) => {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    elements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};

/**
 * 순차적으로 요소들을 애니메이션
 */
export const animateSequence = async (elements, animationClass, delay = 100) => {
  for (let i = 0; i < elements.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    await animateElement(elements[i], animationClass);
  }
};

