'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { changePassword, ChangePasswordInput } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || '';

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Current password is required'),
    password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    const payload: ChangePasswordInput = { email, ...data };
    await changePassword(payload);
    await swal('Password Changed', 'Your password has been changed', 'success', { timer: 2000 });
    reset();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Change Password</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('oldpassword')}
                      isInvalid={!!errors.oldpassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.oldpassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('password')}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('confirmPassword')}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Change
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ChangePassword;
