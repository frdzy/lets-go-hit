import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';
import AppLayout from 'src/layouts/AppLayout/AppLayout';

type LayoutProps = {
  title: string;
  titleTo: string;
  buttonLabel: string;
  buttonTo: string;
  children: React.ReactNode;
};

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <AppLayout>
      <div className="rw-scaffold container mx-auto my-12">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <header className="sm:flex">
          <h2 className="rw-heading rw-heading-primary my-2">
            <Link to={routes[titleTo]()} className="rw-link">
              {title}
            </Link>
          </h2>
          <div className="grow" />
          <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Link>
        </header>
        <div className="my-4">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ScaffoldLayout;
