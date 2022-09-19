import picture from "./media/squad.png";
export default function SquadFooter() {
  return (
    <footer
      id="sticky-footer"
      className="Footer flex-shrink-0 bg-dark text-white-50"
    >
      <div className="row justify-content-center">
        <div className="col text-center">
          <h6 className="mb-0">
            <span>
              <img
                className="img-fluid"
                alt="Look Sir, Droids!"
                src={picture}
              />
            </span>
          </h6>
        </div>
      </div>
      <div className="container text-center py-4">
        <small>Copyright &copy; Jimmy Jimster</small>
      </div>
    </footer>
  );
}
