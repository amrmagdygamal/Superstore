
const Contain = (props: any) => {
  return (
    <section className={props.class1}>
      <div className="container-xxl">
          {props.children}
      </div>
    </section>
  );
};

export default Contain;
