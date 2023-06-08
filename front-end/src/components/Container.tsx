
const Container = (props: any) => {
  return (
    <section className={props.class1}>
      <div className="container-xxl">
        <div className={`row ${props.class2}`}>
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default Container;
