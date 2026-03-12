import clsx from "clsx";
import svgPaths from "./svg-oej1ar3198";
import imgLinkA from "figma:asset/a2616d7c2ac778c6f8d75f07e421726c6e9f2b6a.png";
import imgGroup23LinkA from "figma:asset/04375b21fd72e781a19d95529053fe8297c47a62.png";
import imgGroup23LinkA1 from "figma:asset/0d829751629167d74a37f60e1e3ce65894d6be20.png";
import imgLinkA1 from "figma:asset/94bcd018ae7e3e83310ae217f6c2417f8843e3c9.png";
import imgLinkA2 from "figma:asset/a55fa73edf3ec28f91603fae5c986dfffd5b7291.png";
import imgLinkA3 from "figma:asset/7b83365c45482e39e7578fbe85cff409a2b6f6c1.png";
import imgLinkA4 from "figma:asset/07a9114c818ffc71c7c6320be893fc737239a2f9.png";
import imgLinkA5 from "figma:asset/11e0f76fd4b5557cd29bcbafaa7a0719fb7bedda.png";
import imgRectangle34 from "figma:asset/d7f10d9f31bb6500bea8bbdbdaf5de16612ab39b.png";
type ComplementaryBackgroundImageProps = {
  additionalClassNames?: string;
};

function ComplementaryBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ComplementaryBackgroundImageProps>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[35px] justify-center leading-[0] left-0 text-[#b58468] text-[25px] tracking-[-0.525px]", additionalClassNames)}>
      <p className="leading-[35px]">{children}</p>
    </div>
  );
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-[140px] text-[13px] text-white top-[10.98px] tracking-[-0.195px] w-[101.747px]">
      <p className="leading-[18px]">{children}</p>
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute aspect-[780/474.1300048828125] left-0 right-0 top-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
type GroupBackgroundImage3Props = {
  additionalClassNames?: string;
};

function GroupBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupBackgroundImage3Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-2.79%_-2.7%_-2.79%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0081 12.9019">
          {children}
        </svg>
      </div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-5.5%_-5.59%_-3.97%_-3.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6687 10.6155">
          {children}
        </svg>
      </div>
    </div>
  );
}
type VectorBackgroundImage1Props = {
  additionalClassNames?: string;
};

function VectorBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<VectorBackgroundImage1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-8.64%_-1.81%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9161 6.17224">
          {children}
        </svg>
      </div>
    </div>
  );
}
type BackgroundImage1Props = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function BackgroundImage1({ text, text1, text2, additionalClassNames = "" }: BackgroundImage1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[66px] justify-center leading-[23px] text-[15px] text-white tracking-[-0.225px]", additionalClassNames)}>
      <p className="mb-0">{text}</p>
      <p className="mb-0">{text1}</p>
      <p>{text2}</p>
    </div>
  );
}
type BackgroundImageProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function BackgroundImage({ text, text1, additionalClassNames = "" }: BackgroundImageProps) {
  return (
    <div className={clsx("-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px]", additionalClassNames)}>
      <p>
        <span className="leading-[18px]">{text}</span>
        <span className="leading-[18px] text-[#b58468]">{text1}</span>
      </p>
    </div>
  );
}
type LinkBackgroundImageProps = {
  text: string;
  text1: string;
};

function LinkBackgroundImage({ text, text1 }: LinkBackgroundImageProps) {
  return (
    <div className="absolute backdrop-blur-[3.5px] bg-[rgba(69,43,30,0.5)] font-['Noto_Sans:Regular',sans-serif] h-[79px] leading-[0] left-0 not-italic text-white top-0 tracking-[-0.225px] w-[62px]">
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[17.48px] text-[24px] top-[25.5px] w-[27.383px]">
        <p className="leading-[23px]">{text}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[19.17px] text-[15px] top-[52.5px] w-[24.002px]">
        <p className="leading-[23px]">{text1}</p>
      </div>
    </div>
  );
}
type VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function VectorBackgroundImage({ additionalClassNames = "" }: VectorBackgroundImageProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
        <path d={svgPaths.p3b29e480} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function GroupBackgroundImage2() {
  return (
    <div className="absolute contents inset-[8.33%_0]">
      <VectorBackgroundImage additionalClassNames="inset-[36.11%_68.75%_36.11%_0]" />
      <VectorBackgroundImage additionalClassNames="inset-[8.33%_0_63.89%_68.75%]" />
      <VectorBackgroundImage additionalClassNames="inset-[63.89%_0_8.33%_68.75%]" />
      <VectorBackgroundImage1 additionalClassNames="inset-[22.22%_14.06%_48.54%_14.06%]">
        <path d={svgPaths.p13e3ed80} id="Vector" stroke="var(--stroke-0, white)" />
      </VectorBackgroundImage1>
      <VectorBackgroundImage1 additionalClassNames="inset-[48.54%_14.06%_22.22%_14.06%]">
        <path d={svgPaths.p32482820} id="Vector" stroke="var(--stroke-0, white)" />
      </VectorBackgroundImage1>
    </div>
  );
}

function GroupBackgroundImage1() {
  return (
    <BackgroundImage2 additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.42%]">
      <g id="Group" opacity="0.5">
        <path d={svgPaths.p5ca5100} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.08831" />
      </g>
    </BackgroundImage2>
  );
}

function GroupBackgroundImage() {
  return (
    <BackgroundImage2 additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]">
      <g id="Group">
        <path d={svgPaths.p5ca5100} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.08831" />
      </g>
    </BackgroundImage2>
  );
}

export default function Main() {
  return (
    <div className="relative size-full" data-name="Main">
      <div className="absolute h-[791.8px] left-0 right-[320px] top-0" data-name="Article">
        <div className="absolute aspect-[780/474.1300048828125] left-0 right-0 top-0" data-name="Link → a">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLinkA} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[101.747px]">
          <p className="leading-[18px]">October 14, 2024</p>
        </div>
        <div className="absolute bg-[#b58468] h-[11px] left-[110.39px] top-[507.11px] w-px" data-name="Vertical Divider" />
        <BackgroundImage text="Advisory" text1="," additionalClassNames="left-[121.08px] w-[54.456px]" />
        <BackgroundImage text="Business" text1="," additionalClassNames="left-[180.17px] w-[56.001px]" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[240.8px] not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[51.196px]">
          <p className="leading-[18px]">Civil Law</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[107px] justify-center leading-[52px] left-0 not-italic text-[43px] text-white top-[586.63px] tracking-[-0.516px] w-[700.307px]">
          <p className="mb-0">Civil law written as a type of law is a</p>
          <p>branch that has regulated rights</p>
        </div>
        <BackgroundImage1 text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" text1="magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co mmodo" text2="consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." additionalClassNames="left-0 top-[701.13px] w-[774.98px]" />
        <div className="absolute h-[24px] left-0 top-[766.13px] w-[97.05px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[22px] justify-center leading-[0] left-0 not-italic text-[16px] text-white top-[12px] tracking-[-0.24px] w-[84.72px]">
            <p className="leading-[26.67px]">{`Read More `}</p>
          </div>
          <div className="absolute left-[86.39px] overflow-clip size-[10.66px] top-[7.34px]" data-name="SVG">
            <GroupBackgroundImage />
            <GroupBackgroundImage1 />
          </div>
        </div>
        <div className="absolute h-[18px] left-[724.53px] top-[770.94px] w-[55.47px]" data-name="Link">
          <div className="absolute bottom-0 left-[39.47px] overflow-clip top-0 w-[16px]" data-name="SVG">
            <GroupBackgroundImage2 />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[18px] justify-center leading-[0] not-italic right-[20.7px] text-[13px] text-right text-white top-[9px] tracking-[-0.195px] w-[34.775px]">
            <p className="leading-[18px]">Share</p>
          </div>
        </div>
        <LinkBackgroundImage text="14" text1="Oct" />
      </div>
      <div className="absolute h-[791.8px] left-0 right-[320px] top-[881.8px]" data-name="Article">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[101.747px]">
          <p className="leading-[18px]">October 14, 2024</p>
        </div>
        <div className="absolute bg-[rgba(41,22,22,0.24)] h-[11px] left-[110.39px] top-[507.11px] w-px" data-name="Vertical Divider" />
        <BackgroundImage text="Advisory" text1="," additionalClassNames="left-[121.08px] w-[54.456px]" />
        <BackgroundImage text="Business" text1="," additionalClassNames="left-[180.17px] w-[56.001px]" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[240.8px] not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[51.196px]">
          <p className="leading-[18px]">Civil Law</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[107px] justify-center leading-[52px] left-0 not-italic text-[43px] text-white top-[586.62px] tracking-[-0.516px] w-[648.863px]">
          <p className="mb-0">Non-criminal regulating rights as</p>
          <p>branch types of the civil law</p>
        </div>
        <BackgroundImage1 text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" text1="magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co mmodo" text2="consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." additionalClassNames="left-0 top-[701.12px] w-[774.98px]" />
        <div className="absolute h-[24px] left-0 top-[766.12px] w-[97.05px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[22px] justify-center leading-[0] left-0 not-italic text-[16px] text-white top-[12px] tracking-[-0.24px] w-[84.72px]">
            <p className="leading-[26.67px]">{`Read More `}</p>
          </div>
          <div className="absolute left-[86.39px] overflow-clip size-[10.66px] top-[7.35px]" data-name="SVG">
            <GroupBackgroundImage />
            <GroupBackgroundImage1 />
          </div>
        </div>
        <div className="absolute h-[18px] left-[724.53px] top-[770.93px] w-[55.47px]" data-name="Link">
          <div className="absolute bottom-0 left-[39.47px] overflow-clip top-0 w-[16px]" data-name="SVG">
            <GroupBackgroundImage2 />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[18px] justify-center leading-[0] not-italic right-[20.7px] text-[13px] text-right text-white top-[9px] tracking-[-0.195px] w-[34.775px]">
            <p className="leading-[18px]">Share</p>
          </div>
        </div>
        <div className="absolute h-[474.13px] left-0 overflow-clip right-0 top-0" data-name="Container">
          <BackgroundImage3>
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGroup23LinkA} />
            </div>
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgGroup23LinkA1} />
          </BackgroundImage3>
        </div>
        <LinkBackgroundImage text="14" text1="Oct" />
      </div>
      <div className="absolute h-[791.8px] left-0 right-[320px] top-[1862px]" data-name="Article">
        <BackgroundImage3>
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLinkA1} />
          </div>
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgLinkA2} />
        </BackgroundImage3>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[101.747px]">
          <p className="leading-[18px]">October 14, 2024</p>
        </div>
        <div className="absolute bg-[rgba(41,22,22,0.24)] h-[11px] left-[110.39px] top-[507.11px] w-px" data-name="Vertical Divider" />
        <BackgroundImage text="Advisory" text1="," additionalClassNames="left-[121.08px] w-[54.456px]" />
        <BackgroundImage text="Business" text1="," additionalClassNames="left-[180.17px] w-[56.001px]" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[240.8px] not-italic text-[13px] text-white top-[512.11px] tracking-[-0.195px] w-[51.196px]">
          <p className="leading-[18px]">Civil Law</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[107px] justify-center leading-[52px] left-0 not-italic text-[43px] text-white top-[586.63px] tracking-[-0.516px] w-[695.781px]">
          <p className="mb-0">Real estate is property consisting of</p>
          <p>land and the buildings on it</p>
        </div>
        <BackgroundImage1 text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore" text1="magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co mmodo" text2="consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." additionalClassNames="left-0 top-[701.13px] w-[774.98px]" />
        <div className="absolute h-[24px] left-0 top-[766.13px] w-[97.05px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[22px] justify-center leading-[0] left-0 not-italic text-[16px] text-white top-[12px] tracking-[-0.24px] w-[84.72px]">
            <p className="leading-[26.67px]">{`Read More `}</p>
          </div>
          <div className="absolute left-[86.39px] overflow-clip size-[10.66px] top-[7.34px]" data-name="SVG">
            <GroupBackgroundImage />
            <GroupBackgroundImage1 />
          </div>
        </div>
        <div className="absolute h-[18px] left-[724.53px] top-[770.94px] w-[55.47px]" data-name="Link">
          <div className="absolute bottom-0 left-[39.47px] overflow-clip top-0 w-[16px]" data-name="SVG">
            <GroupBackgroundImage2 />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[18px] justify-center leading-[0] not-italic right-[20.7px] text-[13px] text-right text-white top-[9px] tracking-[-0.195px] w-[34.775px]">
            <p className="leading-[18px]">Share</p>
          </div>
        </div>
        <LinkBackgroundImage text="14" text1="Oct" />
      </div>
      <div className="absolute h-[23px] left-0 right-[320px] top-[2878px]" data-name="Nav">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[333.42px] not-italic text-[15px] text-white top-[11.5px] tracking-[-0.225px] w-[17.117px]">
          <p className="leading-[23px]">01</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[366.14px] not-italic text-[#b58468] text-[15px] top-[11.5px] tracking-[-0.225px] w-[17.117px]">
          <p className="leading-[23px]">02</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[398.86px] not-italic text-[#b58468] text-[15px] top-[11.5px] tracking-[-0.225px] w-[17.117px]">
          <p className="leading-[23px]">03</p>
        </div>
        <div className="absolute left-[436.58px] overflow-clip size-[13px] top-[5px]" data-name="Link → SVG">
          <GroupBackgroundImage3 additionalClassNames="inset-[3%_2.57%_3%_0]">
            <g id="Group">
              <path d={svgPaths.p1848e588} id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
              <path d={svgPaths.p2cba2880} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
              <path d="M0 6.50715H12.1829" id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
            </g>
          </GroupBackgroundImage3>
          <GroupBackgroundImage3 additionalClassNames="inset-[3%_112.57%_3%_-110%]">
            <g id="Group" opacity="0.5">
              <path d={svgPaths.p1848e588} id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
              <path d={svgPaths.p2cba2880} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
              <path d="M1.63487e-07 6.50715H12.1829" id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="2.613" strokeWidth="0.965714" />
            </g>
          </GroupBackgroundImage3>
        </div>
      </div>
      <div className="absolute h-[809px] left-[840px] right-0 top-0" data-name="Complementary">
        <div className="absolute h-[38px] left-0 right-0 top-0" data-name="Form">
          <div className="absolute border-[#b58468] border-b border-solid inset-0 overflow-clip" data-name="Input">
            <div className="absolute h-[18px] left-0 overflow-clip right-0 top-[9.5px]" data-name="Container">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[9px] w-[41.486px]">
                <p className="leading-[normal]">Search</p>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+121.75px)] size-[16.5px] top-1/2" data-name="Button → SVG">
            <div className="absolute inset-[0_0_2.1%_2.1%]" data-name="Group">
              <div className="absolute inset-[0_0_-2.14%_-2.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4996 16.4996">
                  <g id="Group">
                    <g id="Group_2">
                      <g id="Vector" />
                      <path d={svgPaths.p1e2cb240} id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="0.978996" />
                    </g>
                    <path d={svgPaths.p1089ed00} id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="0.978996" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <ComplementaryBackgroundImage additionalClassNames="top-[94.5px] w-[130.964px]">Categrories</ComplementaryBackgroundImage>
        <div className="absolute font-['Noto_Sans:Regular',sans-serif] h-[106px] leading-[0] left-0 not-italic right-0 text-[13px] text-white top-[130px] tracking-[-0.195px]" data-name="List">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[51.156px]">
            <p className="leading-[18px]">Advisory</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[31px] w-[52.69px]">
            <p className="leading-[18px]">Business</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[53px] w-[51.196px]">
            <p className="leading-[18px]">Civil Law</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[75px] w-[76.818px]">
            <p className="leading-[18px]">Criminal Law</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[97px] w-[65.179px]">
            <p className="leading-[18px]">Real Estate</p>
          </div>
        </div>
        <ComplementaryBackgroundImage additionalClassNames="top-[292.5px] w-[136.822px]">Latest News</ComplementaryBackgroundImage>
        <div className="absolute h-[100px] left-0 right-0 top-[340px]" data-name="Article">
          <div className="absolute aspect-[120/72.94000244140625] left-0 right-[140px] top-0" data-name="Link → a">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA3} />
          </div>
          <BackgroundImage4>October 16, 2024</BackgroundImage4>
          <BackgroundImage1 text="Financial Growth" text1="In Advisor" text2="Credentials" additionalClassNames="left-[140px] top-[62px] w-[114.717px]" />
        </div>
        <div className="absolute h-[100px] left-0 right-0 top-[465px]" data-name="Article">
          <div className="absolute aspect-[120/72.94000244140625] left-0 right-[140px] top-0" data-name="Link → a">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA4} />
          </div>
          <BackgroundImage4>October 16, 2024</BackgroundImage4>
          <BackgroundImage1 text="Law and" text1="Regulations – A" text2="Safety Day" additionalClassNames="left-[140px] top-[62px] w-[105.272px]" />
        </div>
        <div className="absolute h-[77px] left-0 right-0 top-[590px]" data-name="Article">
          <div className="absolute aspect-[120/72.94000244140625] left-0 right-[140px] top-0" data-name="Link → a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLinkA5} />
            </div>
          </div>
          <BackgroundImage4>October 15, 2024</BackgroundImage4>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[43px] justify-center leading-[23px] left-[140px] text-[15px] text-white top-[50.5px] tracking-[-0.225px] w-[116.32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="mb-0">Property Service-</p>
            <p>lead agency</p>
          </div>
        </div>
        <ComplementaryBackgroundImage additionalClassNames="top-[723.5px] w-[71px]">Tags</ComplementaryBackgroundImage>
        <div className="absolute bottom-[27px] capitalize font-['Noto_Sans:Regular',sans-serif] leading-[0] left-0 not-italic text-[13px] text-white top-[764px] tracking-[-0.195px] w-[50.8px]" data-name="Link - Advisory (8 items)">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[51.156px]">
            <p className="leading-[18px]">Advisory</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-[57.8px] top-[9px] w-[7.319px]">
            <p className="leading-[18px]">|</p>
          </div>
        </div>
        <div className="absolute bottom-[27px] capitalize font-['Noto_Sans:Regular',sans-serif] leading-[0] left-[70.8px] not-italic text-[13px] text-white top-[764px] tracking-[-0.195px] w-[47.88px]" data-name="Link - Analysis (3 items)">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[48.227px]">
            <p className="leading-[18px]">Analysis</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-[54.87px] top-[9px] w-[7.319px]">
            <p className="leading-[18px]">|</p>
          </div>
        </div>
        <div className="absolute bottom-[27px] capitalize font-['Noto_Sans:Regular',sans-serif] leading-[0] left-[138.67px] not-italic text-[13px] text-white top-[764px] tracking-[-0.195px] w-[52.33px]" data-name="Link - Business (8 items)">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[52.69px]">
            <p className="leading-[18px]">Business</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-[59.31px] top-[9px] w-[7.319px]">
            <p className="leading-[18px]">|</p>
          </div>
        </div>
        <div className="absolute bottom-0 capitalize font-['Noto_Sans:Regular',sans-serif] leading-[0] left-0 not-italic text-[13px] text-white top-[791px] tracking-[-0.195px] w-[50.84px]" data-name="Link - Civil Law (8 items)">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[51.196px]">
            <p className="leading-[18px]">Civil Law</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-[57.84px] top-[9px] w-[7.319px]">
            <p className="leading-[18px]">|</p>
          </div>
        </div>
        <div className="absolute bottom-0 capitalize font-['Noto_Sans:Regular',sans-serif] leading-[0] left-[70.84px] not-italic text-[13px] text-white top-[791px] tracking-[-0.195px] w-[32.2px]" data-name="Link - Profit (3 items)">
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-0 top-[9px] w-[32.79px]">
            <p className="leading-[18px]">Profit</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[18px] justify-center left-[39.19px] top-[9px] w-[7.319px]">
            <p className="leading-[18px]">|</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-[123.05px] text-[13px] text-white top-[800px] tracking-[-0.195px] w-[52.329px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[18px]">Statistics</p>
        </div>
      </div>
      <div className="absolute h-[474px] left-[841px] top-[882px] w-[259px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#452b1e] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-full left-[-101.63%] max-w-none top-0 w-[325.35%]" src={imgRectangle34} />
          </div>
        </div>
      </div>
      <div className="absolute h-[416px] left-[841px] top-[940px] w-[259px]" style={{ backgroundImage: "linear-gradient(174.793deg, rgba(69, 43, 30, 0) 13.864%, rgb(69, 43, 30) 56.642%)" }} />
      <div className="absolute left-[884px] size-[100px] top-[1524px]" />
      <div className="absolute bg-[#b58468] h-[81px] left-[873px] top-[1206px] w-[200px]" />
    </div>
  );
}