import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="mt-auto py-5 text-white font-semibold bg-slate-900">
      <section className="container mx-auto flex justify-between items-center px-7">
        <div></div>
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://github.com/vasylmiskiv/heroes-client"
            rel="noreferrer"
            target="_blank"
            className="flex items-center gap-2"
          >
            <AiOutlineGithub size={25} />
            Vasyl Miskiv
          </a>
          <div>© {new Date().getFullYear()}</div>
        </div>
        <div></div>
      </section>
    </footer>
  );
};

export default Footer;
