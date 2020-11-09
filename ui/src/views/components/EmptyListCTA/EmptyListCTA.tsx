import React, { MouseEvent, useContext } from 'react';
import { CallToActionCard, LinkButton, ThemeContext, Icon, IconName } from 'src/packages/datav-core';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

export interface Props {
  title: string;
  buttonIcon: IconName;
  buttonLink?: string;
  buttonTitle: string;
  onClick?: (event: MouseEvent) => void;
  proTip?: string;
  proTipLink?: string;
  proTipLinkTitle?: string;
  proTipTarget?: string;
  infoBox?: { __html: string };
  infoBoxTitle?: string;
}

const ctaStyle = css`
  text-align: center;
`;

const infoBoxStyles = css`
  max-width: 700px;
  margin: 0 auto;
`;

const EmptyListCTA: React.FunctionComponent<Props> = ({
  title,
  buttonIcon,
  buttonLink,
  buttonTitle,
  onClick,
  proTip,
  proTipLink,
  proTipLinkTitle,
  proTipTarget,
  infoBox,
  infoBoxTitle,
}) => {
  const theme = useContext(ThemeContext);
 
  const footer = () => {
    return (
      <>
        {proTip ? (
          <span key="proTipFooter">
            <Icon name="rocket" />
            <> ProTip: {proTip} </>
            <Link to={proTipLink} className="text-link">
              {proTipLinkTitle}
            </Link>
          </span>
        ) : (
          ''
        )}
        {infoBox ? (
          <div key="infoBoxHtml" className={`grafana-info-box ${infoBoxStyles}`}>
            {infoBoxTitle && <h5>{infoBoxTitle}</h5>}
            <div dangerouslySetInnerHTML={infoBox} />
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  const ctaElementClassName = !footer()
    ? css`
        margin-bottom: 20px;
      `
    : '';

  const ctaElement = (
    <LinkButton
      size="lg"
      onClick={onClick}
      href={buttonLink}
      icon={buttonIcon}
      className={ctaElementClassName}
      aria-label={`Call to action button ${buttonTitle}`}
    >
      {buttonTitle}
    </LinkButton>
  );

  return (
    <CallToActionCard
      className={ctaStyle}
      message={title}
      footer={footer()}
      callToActionElement={ctaElement}
      theme={theme}
    />
  );
};

export default EmptyListCTA;
