import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import type { ErrorProps } from 'next/error';

interface AppErrorProps extends ErrorProps {
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const CustomErrorComponent = (props: AppErrorProps) => {
  const { statusCode, hasGetInitialPropsRun, err } = props;

  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (context: any) => {
  const errorInitialProps: AppErrorProps = await NextErrorComponent.getInitialProps(context);

  const { res, err, asPath } = context;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default CustomErrorComponent;