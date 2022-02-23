import React from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, className }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color:black;
  
  @media (prefers-color-scheme: dark) {
    background: radial-gradient(circle at 50% 50%, #1b0000, #180000, #150000, #110000, #0c0000, #060000, #000000);    color:white;
`;
