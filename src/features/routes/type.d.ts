interface IRoutes {
  path: string;
  component: FC<any>;
  layout?: FC<any>;
  isPublic: boolean;
  role?: Array<number>;
}

export { IRoutes };
