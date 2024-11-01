
import { Loading } from '@/components/loading';
import { getLayoutStore, useLayoutStoreSlice } from '@/store';
import { getNow } from '@cmtlyt/base';
import { useEffect, useRef, useState } from 'react';
import { useMatches } from 'react-router-dom';
import styled from 'styled-components';

const minShowTime = 300;

const LoadingWrapper = styled.section<{$show: boolean}>`
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 10vmin;
  opacity: 0;
  transition: opacity 100ms;
    ${({$show}) => {
        if($show) return {opacity: 1}
        return { 'pointer-events': 'none', transition: `opacity ${minShowTime}ms`}
    }}
`

export function LayoutLoading() {
  const { loading } = useLayoutStoreSlice('loading');
  const matches = useMatches();
  const [show, setShow] = useState(false);
  const timeGap = useRef(0);

  useEffect(() => {
    if(loading) {
      const timer = setTimeout(() => setShow(loading), 10);
      return () => clearTimeout(timer);
    }

    const now = getNow();
    if(now - timeGap.current > minShowTime) {
      timeGap.current = now;
      setShow(loading);

      return;
    }
    const timer = setTimeout(() => setShow(loading), minShowTime - now + timeGap.current);
    return () => clearTimeout(timer);
  }, [loading])

  useEffect(() => {
    getLayoutStore().setLoading(false)
  }, [matches]);

  return(
    <LoadingWrapper $show={show}>
      <Loading/>
    </LoadingWrapper>
  )
}