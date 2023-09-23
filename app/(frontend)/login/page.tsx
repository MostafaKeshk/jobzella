import LoginForm from "./_components/LoginForm";
import Routes from "@/routes";
import { getServerSession } from "@/utils/getServerSession";
import Image from "next/image";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();
  if (session && session.token) {
    redirect(Routes.home);
  }

  return (
    <div className="bg-primary relative">
      <Image
        src="/images/filledCircle.png"
        width={122}
        height={122}
        alt="circle"
        className="absolute top-0 left-1/3"
      />
      <Image
        src="/images/line.png"
        width={326.78}
        height={200.31}
        alt="line"
        className="absolute top-0 left-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="grid grid-cols-12 lg:gap-12 h-screen">
          <div className="col-span-7 hidden lg:flex h-full  flex-col justify-evenly">
            <Image
              src="/images/logo.png"
              width={174.4}
              height={48}
              alt="jobzella-logo"
            />
            <div className="relative h-96 w-full">
              <Image src="/images/login.png" layout="fill" alt="login" />
            </div>
            <div />
          </div>
          <div className="col-span-12 lg:col-span-5 h-full flex flex-col justify-center">
            <Image
              src="/images/logo.png"
              width={174.4}
              height={48}
              alt="jobzella-logo"
              className="my-5 block lg:hidden"
            />
            <div className="bg-white rounded-lg px-10 md:pb-20 pt-10 w-full">
              <h1 className="text-[40px] font-bold relative">
                Login
                <span className="absolute left-0 -bottom-2 h-[1px] w-28 bg-black"></span>
              </h1>
              <h2 className="text-[24px] text-lightText font-semibold mt-10 mb-1">
                Welcome to Jobzella! 👋🏻
              </h2>
              <p className="text-[14px] text-lightText mb-6">
                Please sign-in to your account and start the adventure
              </p>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
