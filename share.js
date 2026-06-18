// 1. 클립보드에 현재 주소 복사하는 함수
function copyCurrentUrl() {
    const currentUrl = window.location.href;

    // 최신 브라우저 클립보드 API 사용
    navigator.clipboard.writeText(currentUrl).then(() => {
        alert("주소가 클립보드에 복사되었습니다! 원하는 곳에 붙여넣기(Ctrl+V) 하세요.");
    }).catch(err => {
        // 구형 브라우저 대응을 위한 임시 fallback
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = currentUrl;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert("주소가 복사되었습니다.");
    });
}

// 2. 스마트폰/기기 자체 공유 기능을 띄우는 함수 (Web Share API)
function shareSystem() {
    if (navigator.share) {
        navigator.share({
            title: document.title,       // 현재 페이지 제목
            text: '이 페이지를 확인해보세요!', // 공유 시 함께 보낼 문구
            url: window.location.href    // 현재 페이지 주소
        })
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패', error));
    }
}

// DOM이 완전히 로드된 후 실행되도록 설정 (HTML 버튼 요소가 생성된 후 접근해야 하므로)
document.addEventListener("DOMContentLoaded", () => {
    const nativeShareBtn = document.getElementById('nativeShareBtn');
    
    // 브라우저가 기기 자체 공유(Web Share API)를 지원하면 버튼을 보여줍니다.
    if (navigator.share && nativeShareBtn) {
        nativeShareBtn.style.display = 'block';
    }
});