# Project Design Standards & Layout Guide
# 프로젝트 디자인 및 레이아웃 표준 가이드

이 문서는 프로젝트의 모든 페이지에 공통적으로 적용되는 레이아웃 및 디자인 규칙을 정의합니다.
개발 시 이 규칙을 최우선으로 준수해야 합니다.

## 1. Global Layout (전체 레이아웃)

모든 메인 섹션은 **고정 너비 컨테이너** 방식을 사용합니다. 화면이 줄어들 때 콘텐츠가 찌그러지지 않고, 양옆 여백이 줄어드는 방식을 취합니다.

### 표준 컨테이너 구조 (Standard Container Structure)
섹션(`section`) 내부에 다음과 같은 `div` 컨테이너를 배치하여 콘텐츠를 감쌉니다.

```html
<section class="w-full bg-white py-[40px] md:py-[80px] px-[10px] md:px-[40px]">
    <!-- Inner Container -->
    <div class="max-w-[1280px] mx-auto flex flex-col md:flex-row ...">
        <!-- Content goes here -->
    </div>
</section>
```

### 핵심 규칙 (Key Rules)
*   **Max Width**: `max-w-[1280px]` (최대 너비 1280px 고정)
*   **Align**: `mx-auto` (중앙 정렬)
*   **Horizontal Padding (가로 여백)**:
    *   **Mobile**: `px-[10px]` (최소 여백)
    *   **Desktop**: `md:px-[40px]` (넉넉한 여백)
*   **Vertical Padding (세로 여백)**:
    *   **Mobile**: `py-[40px]`
    *   **Desktop**: `md:py-[80px]`

---

## 2. Typography & Sizing (텍스트 및 크기)

### 단위 사용 규칙 (Unit Strategy)
*   **`vw` (Viewport Width) 사용 금지**: 텍스트 크기나 요소의 너비/높이에 `vw` 단위를 사용하지 않습니다. (화면이 줄어들 때 콘텐츠가 지나치게 작아지는 것을 방지)
*   **`px` (Pixel) 사용**: 데스크탑에서는 고정된 `px` 단위를 사용하여 의도한 디자인 크기를 유지합니다.
*   **`clamp()` 사용 권장**: 모바일과 데스크탑 사이즈 차이가 클 경우, `clamp(최소px, 반응형비율, 최대px)`를 사용하여 자연스럽게 연결합니다.

### 예시 (Example)
*   **Bad (지양)**: `text-[1.25vw]`, `w-[30vw]`
*   **Good (권장)**: `text-[16px] md:text-[24px]`, `w-full md:w-[380px]`

---

## 3. Component Specifics (컴포넌트별 규칙)

### Vision Cards (비전 카드)
*   **Height**: `md:h-[267px]` 고정 (데스크탑)
*   **Min-Height**: `min-h-[260px]` (반응형 대응 시 찌그러짐 방지)
*   **Width**: 유동적(`flex-1` 또는 `grid`)으로 하되, 너무 작아지지 않게 주의.

---

**Note to AI Assistant**:
사용자가 "표준 레이아웃으로 맞춰줘" 또는 "DESIGN_STANDARDS 참고해"라고 요청하면, **반드시 위 규칙(특히 1280px 컨테이너 및 10px/40px 패딩)**을 적용하여 코드를 작성하세요.
