import clsx from "clsx";
import svgPaths from "./svg-vcutxbenrp";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] text-[15px] text-white tracking-[-0.225px]", additionalClassNames)}>
      <p className="leading-[21px]">{children}</p>
    </div>
  );
}
type GroupProps = {
  additionalClassNames?: string;
};

function Group({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-5.5%_-5.59%_-3.97%_-3.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0081 9.95829">
          {children}
        </svg>
      </div>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[22px] left-[1171.34px] top-[20.73px] w-[184.66px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[10.66px] not-italic text-[15px] text-white top-[11.27px] tracking-[-0.225px] w-[172.994px]">
          <p className="leading-[25px]">Agendar Atendimento</p>
        </div>
        <div className="absolute left-[174.66px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <Group additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]">
            <g id="Group">
              <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
            </g>
          </Group>
          <Group additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.43%]">
            <g id="Group" opacity="0.5">
              <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
            </g>
          </Group>
        </div>
      </div>
      <div className="absolute border-[#a57255] border-b border-solid bottom-[2.5px] h-[2px] left-0 w-[1356px]" data-name="Horizontal Divider" />
      <div className="absolute contents left-[359px] top-0">
        <div className="absolute bottom-0 left-[359px] top-0 w-[511.947px]" data-name="Navigation - Top Menu → List">
          <div className="-translate-y-1/2 absolute h-[21px] left-[15px] top-1/2 w-[42.31px]" data-name="Item → Link">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] left-0 text-[15px] text-white top-[10px] tracking-[-0.225px] w-[42.639px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[21px]">Home</p>
            </div>
          </div>
          <Wrapper additionalClassNames="left-[108px] top-[34.5px] w-[42.138px]">Sobre</Wrapper>
          <Wrapper additionalClassNames="left-[201px] top-[35.5px] w-[126px]">Áreas de Atuação</Wrapper>
          <Wrapper additionalClassNames="left-[378px] top-[34.5px] w-[38px]">Blog</Wrapper>
          <Wrapper additionalClassNames="left-[467px] top-[35.5px] w-[30px]">FAQ</Wrapper>
        </div>
        <Wrapper additionalClassNames="left-[926.07px] top-[32.5px] w-[71.934px]">Contato</Wrapper>
      </div>
      <div className="absolute contents inset-[30.43%_86.8%_25.28%_1.18%]">
        <div className="absolute contents inset-[30.43%_86.8%_25.28%_1.18%]">
          <div className="absolute contents inset-[30.43%_86.8%_25.28%_1.18%]">
            <div className="absolute inset-[35.88%_86.8%_36.68%_3.69%]" data-name="Group">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.927 18.9273">
                <g id="Group">
                  <path d={svgPaths.p2122da00} fill="var(--fill-0, white)" id="Vector" />
                  <path d={svgPaths.p205c9500} fill="var(--fill-0, white)" id="Vector_2" />
                  <path d={svgPaths.p1b794b00} fill="var(--fill-0, white)" id="Vector_3" />
                  <path d={svgPaths.p369f100} fill="var(--fill-0, white)" id="Vector_4" />
                  <path d={svgPaths.p6ff1700} fill="var(--fill-0, white)" id="Vector_5" />
                  <path d={svgPaths.p165c4f00} fill="var(--fill-0, white)" id="Vector_6" />
                  <path d={svgPaths.p3455f900} fill="var(--fill-0, white)" id="Vector_7" />
                  <path d={svgPaths.p2375b800} fill="var(--fill-0, white)" id="Vector_8" />
                  <path d={svgPaths.p3b7ae80} fill="var(--fill-0, white)" id="Vector_9" />
                  <path d={svgPaths.p6adb900} fill="var(--fill-0, white)" id="Vector_10" />
                  <path d={svgPaths.p11779940} fill="var(--fill-0, white)" id="Vector_11" />
                </g>
              </svg>
            </div>
            <div className="absolute inset-[64.81%_90.17%_28.96%_7.08%]" data-name="Group">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2785 4.29913">
                <g id="Group">
                  <path d={svgPaths.pcf42f00} fill="var(--fill-0, white)" id="Vector" />
                  <path d={svgPaths.pa8001c0} fill="var(--fill-0, white)" id="Vector_2" />
                  <path d={svgPaths.pfaf0e40} fill="var(--fill-0, white)" id="Vector_3" />
                  <path d={svgPaths.p1d5e4280} fill="var(--fill-0, white)" id="Vector_4" />
                  <path d={svgPaths.p23f74a00} fill="var(--fill-0, white)" id="Vector_5" />
                  <path d={svgPaths.p2fcecdc0} fill="var(--fill-0, white)" id="Vector_6" />
                  <path d={svgPaths.p11794900} fill="var(--fill-0, white)" id="Vector_7" />
                  <path d={svgPaths.p30b2d00} fill="var(--fill-0, white)" id="Vector_8" />
                  <path d={svgPaths.p2b435f00} fill="var(--fill-0, white)" id="Vector_9" />
                </g>
              </svg>
            </div>
            <div className="absolute inset-[30.43%_96.75%_25.28%_1.18%]" data-name="Group">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.1005 30.5581">
                <g id="Group">
                  <path d={svgPaths.p3a5dc400} fill="var(--fill-0, #D1B9A7)" id="Vector" />
                  <path d={svgPaths.p17969700} fill="var(--fill-0, #D1B9A7)" id="Vector_2" />
                  <path d={svgPaths.p133dfb00} fill="var(--fill-0, #D1B9A7)" id="Vector_3" />
                  <path d={svgPaths.p28aec400} fill="var(--fill-0, #D1B9A7)" id="Vector_4" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}